import Habits from "@/components/habits/Habits"
import Preloader from "@/components/Preloader"
import calcDoneHabits from "@/lib/calcDoneHabits"
import getCurrentDate from "@/lib/getCurrentDate"
import { store } from "@/store"
import { setDoneHabits, setHabits } from "@/store/habitsSlice"
import { Habit } from "@/types"
import { getServerSession } from "next-auth"
import options from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import NoHabitsYet from "@/components/habits/NoHabitsYet"

async function getHabits(email: string) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "user" && email == $email][0] {
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
    )}&$email="${email}"`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["habits"],
      },
    }
  )
  const habits = await res.json()
  return habits.result
}

export default async function Home() {
  const session = await getServerSession(options)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  const data = await getHabits(session?.user?.email as string)
  const habits: Habit[] = data.habits

  const currentDate = getCurrentDate()
  const doneHabits = calcDoneHabits(habits, currentDate)
  store.dispatch(setHabits(habits))
  store.dispatch(setDoneHabits(doneHabits))

  return (
    <main className="container flex justify-center">
      <Preloader habits={habits} doneHabits={doneHabits} />
      {habits.length > 0 ? <Habits habitsData={habits} /> : <NoHabitsYet />}
    </main>
  )
}
