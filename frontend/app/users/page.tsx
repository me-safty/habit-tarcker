import options from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import UserBox from "@/components/users/UserBox"
import { User } from "@/types"
import Link from "next/link"

async function getUsers() {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "user"] {
    name,
    _id,
    email,
    imglink,
    slug,
  }
`
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["users"],
      },
    }
  )
  const users = await res.json()
  return users.result
}

export default async function page() {
  const session = await getServerSession(options)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  const users: User[] = await getUsers()

  return (
    <main className="container flex flex-col items-center justify-center">
      {users.map((user) => (
      <Link key={user._id} href={`/${user._id}`}>
      
        
      <UserBox  imglink={user.imglink} name={user.name} />
     </Link>
        ))}
    </main>
  )
}
