import { sanityClint } from "@/client"
import { groq } from "next-sanity"
import Tasks from "@/components/Tasks"
import { Task } from "@/typing"

async function getHabits() {
  return sanityClint.fetch(
    groq`
    *[_type == "habit"] {
      _id,
      _createdAt,
      name,
      bestStreak,
      dates,
      slug,
    }
  `
  )
}

export default async function Home() {
  const habits: Task[] = await getHabits()
  return (
    <main className="container">
      <Tasks tasks={habits} />
    </main>
  )
}
