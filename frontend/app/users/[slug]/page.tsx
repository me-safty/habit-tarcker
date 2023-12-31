import options from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import UserPage from "@/components/users/UserPage"

async function getUser(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "user" && slug.current == $slug][0] {
    name,
    _id,
    email,
    imglink,
    slug,
    "habits": *[_type == "habit" && user._ref == ^._id] {
      _id,
      _createdAt,
      name,
      currentStreak,
      bestStreak,
      dates,
      slug,
      category ->,
      user ->,
      "categories": *[_type == "category" ]
    }
  }
`
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
      query
    )}&$slug="${slug}"`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["user"],
      },
    }
  )
  const user = await res.json()
  return user.result
}

export default async function page({ params }: { params: { slug: string } }) {
  const session = await getServerSession(options)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  const user = await getUser(params.slug)

  return (
    <main className="container flex flex-col items-center justify-center">
      <UserPage user={user} />
    </main>
  )
}
