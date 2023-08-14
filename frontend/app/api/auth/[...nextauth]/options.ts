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

const options: AuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
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
    async session({ session }) {
      // Send properties to the client, like an access_token and user id from a provider.
      try {
        const query = `*[_type == "user" && email == $email][0]{
          _id,
          name,
          email,
        }`
        const user = await sanityClint.fetch(query, {
          email: session.user?.email,
        })
        //@ts-ignore
        session.user.id = user._id
        return session
      } catch (error) {
        console.log(error)
      }
      return session
    },
  },
}

export default options
