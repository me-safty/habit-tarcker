import options from "@/app/api/auth/[...nextauth]/options"
import HabitPage from "@/components/HabitPage"
import { Habit } from "@/types"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

interface TaskPagProps {
  params: { slug: string }
}

async function getHabit(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "habit" && slug.current == $slug][0] {
    _id,
    _createdAt,
    name,
    bestStreak,
    currentStreak,
    dates,
    slug,
    category ->,
    "categories": *[_type == "category" ]
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
        tags: ["habitPage"],
      },
    }
  )
  const habits = await res.json()
  return habits.result
}

export default async function page({ params }: TaskPagProps) {
  const session = await getServerSession(options)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  const habit: Habit = await getHabit(params.slug)
  return (
    <main className="container flex flex-col items-center justify-center">
      <HabitPage habitData={habit} />
    </main>
  )
}
