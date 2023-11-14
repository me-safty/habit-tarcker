import { User } from "@/types"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { createClient } from "next-sanity"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
}

const sanityClint = createClient(config)

/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
async function refreshAccessToken(token: Record<string, never>) {
  try {
    const url =
      "https://oauth2.googleapis.com/token?" +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID as string,
        client_secret: process.env.GOOGLE_CLIENT_SECRET as string,
        grant_type: "refresh_token",
        refresh_token: token.refreshToken,
      })

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
    })

    const refreshedTokens = await response.json()
    if (!response.ok) {
      throw refreshedTokens
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    }
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: "RefreshAccessTokenError",
    }
  }
}

const options: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            "openid https://www.googleapis.com/auth/tasks.readonly email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "username",
          type: "text",
          placeholder: "username",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials) {
        const user = {
          username: "safty",
          password: "admin",
          id: "212",
          email: "safty@gmail.com",
          image:
            "https://lh3.googleusercontent.com/a/AAcHTtcDq0-CfFkrqjoVYm0Rku-LCKrzphE7G5OllGie9FpreUlK=s96-c",
        }

        // const query = `*[_type == "user" && email == $email && name == $name][0]{
        // 	_id,
        // 	name,
        // 	email,
        //   hashedPassword,
        // }`
        // const user = await sanityClint.fetch(query, {
        //   email: credentials?.email,
        //   name: credentials?.username,
        // })

        // if (!user) {
        //   return null
        // }

        // if (user.password === credentials?.password) {
        //   return user
        // }

        if (
          user.username === credentials?.username &&
          user.password === credentials?.password
        ) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    //@ts-ignore
    async signIn({ user }) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        try {
          const authorQuery = `*[_type == "user"]{
						email
					}`
          const authors = await sanityClint.fetch(authorQuery)
          const existingEmail = authors.find(
            (e: User) => e.email === user.email
          )
          if (!existingEmail) {
            try {
              await sanityClint.create({
                _type: "user",
                name: user.name,
                email: user.email,
                imglink: user.image,
                slug: {
                  _type: "slug",
                  current: user.email?.toLowerCase().split("@")[0],
                },
              })
            } catch (error) {
              console.log(error)
            }
          }
        } catch (error) {
          console.log(error)
        }
        return true
      } else {
        return false
      }
    },
    // @ts-ignore
    async jwt({ token, account, user }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.accessToken,
          //@ts-ignore
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        }
      }

      //@ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        return token
      }

      // Access token has expired, try to update it
      //@ts-ignore
      return refreshAccessToken(token)
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // console.log({ token, session })
      try {
        if (token) {
          // @ts-ignore
          session.user = token.user
          // @ts-ignore
          session.accessToken = token.accessToken
          // @ts-ignore
          session.error = token.error
        }
        // const query = `*[_type == "user" && email == $email][0]{
        //   _id,
        //   name,
        //   email,
        // }`
        // const user = await sanityClint.fetch(query, {
        //   email: session.user?.email,
        // })
        // //@ts-ignore
        // session.user.id = user._id
        // console.log({ session, token })
        // session.accessToken = token.accessToken
        return session
      } catch (error) {
        console.log(error)
      }
      return session
    },
  },
}

export default options
