import { sanityClint } from "@/client"
import NextAuth, { User } from "next-auth"
// import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "username",
    //       type: "text",
    //       placeholder: "username"
    //     }
    //     password: {
    //       label: "password",
    //       type: "password",
    //       placeholder: "password"
    //     }
    //   },
    //   async authorize(credentials) {
    //     const user = ""
    //     if (user) {
    //       return user
    //     } else {
    //       return null
    //     }
    //   }
    // })
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
          const existingEmail = authors.find((e: User) => e.email == user.email)
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
        const author = await sanityClint.fetch(query, {
          email: session.user?.email,
        })
        //@ts-ignore
        session.user.id = author._id
        return session
      } catch (error) {
        console.log(error)
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
