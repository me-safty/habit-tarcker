import Habits from "@/components/habits/Habits"
import Preloader from "@/components/Preloader"
import calcDoneHabits from "@/lib/calcDoneHabits"
import getCurrentDate from "@/lib/getCurrentDate"
import { store } from "@/store"
import { setDoneHabits, setHabits } from "@/store/habitsSlice"
import { GoogleHabits, Habit } from "@/types"
import { getServerSession } from "next-auth"
import options from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import NoHabitsYet from "@/components/habits/NoHabitsYet"
import calcStreak from "@/lib/calcStreak"
import transformGoogleTasksToHabits from "@/lib/transformGoogleTasksToHabit"
import { createHabitData, deleteHabit } from "@/lib/serverActions"
import getUpdatedDatesForGoogleTask from "@/lib/habit/getUpdatedDatesForGoogleTask"

async function getHabits(email: string, token: string) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "user" && email == $email][0] {
    _id,
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
  if (!habits) {
    return
  }
  const habitsWithGoogle = await getHabitsWIthGoogleTasks(
    habits.result.habits,
    token
  )
  return habitsWithGoogle
}
async function getHabitsWIthGoogleTasks(habits: Habit[], token: string) {
  const listId = "MTc3NDA5Mjg2NTQzMjM3Mzk0MzY6MDow"
  const filteredValues = ["id", "title", "status", "due"].join()
  try {
    const res = await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks?showCompleted=true&showHidden=true&fields=items(${filteredValues})`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const googleTasks: GoogleHabits = await res.json()
    if (!googleTasks) {
      return
    }
    const googleCatId = "c2d1e476-9499-4dfc-b961-ed7fad2fac58"
    const googleDBHabits = habits.filter(
      (habit) => habit.category._id === googleCatId
    )
    const googleTasksHabits = transformGoogleTasksToHabits(
      googleTasks.items
        .filter((task) => task?.due)
        .map((task) => {
          const googleDBHabit = googleDBHabits.find(
            (habit) => habit.name === task.title
          )
          const dates = getUpdatedDatesForGoogleTask(
            task,
            googleDBHabit as Habit
          )
          return {
            ...task,
            dates,
            slug: googleDBHabit ? googleDBHabit.slug.current : undefined,
            createdAt: googleDBHabit ? googleDBHabit._createdAt : undefined,
          }
        }),
      habits[0].user,
      habits[0].categories
    )
    // console.log(googleTasksHabits)
    // console.log(googleTasks.items.map((h) => h.title))
    // console.log(
    //   googleDBHabits.find((habit) => habit.name === googleTasks.items[3].title)
    //     ?.name
    // )
    const newHabits = googleTasksHabits.filter(
      (gHabit) =>
        googleDBHabits.find((DBHabit) => DBHabit._id === gHabit._id) ===
        undefined
    )
    if (newHabits.length > 0) {
      newHabits.forEach((habit) =>
        createHabitData(
          habit.name,
          habit._id,
          habit.user._id,
          habit.category._id,
          habit.dates
        )
      )
    }
    const deletedHabits = googleDBHabits.filter(
      (gHabit) =>
        googleTasksHabits.find((DBHabit) => DBHabit._id === gHabit._id) ===
        undefined
    )
    if (deletedHabits.length > 0) {
      deletedHabits.forEach((habit) => deleteHabit(habit._id))
    }
    const habitsWithGoogle = [
      ...googleTasksHabits,
      ...habits.filter((habit) => habit.category._id !== googleCatId),
    ]
    return habitsWithGoogle
  } catch (error) {
    console.log(error)
  }
}

// async function addGoogleHabitsByCategoryId(
//   token: string,
//   listId: string
// ): Promise<void> {
//   try {
//     const res = await fetch(
//       `https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks?showCompleted=true&showHidden=true`,
//       {
//         // const res = await fetch("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     )
//     const googleHabits: GoogleHabits = await res.json()
//   } catch (error) {
//     console.log(error)
//   }
// }

export default async function Home() {
  const session: any = await getServerSession(options)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }
  const habits = (await getHabits(
    session?.user?.email as string,
    session?.accessToken
  )) as Habit[]
  const habitsWithStreak = habits
    ? habits.map((habit) => ({
        ...habit,
        currentStreak: calcStreak(habit.dates),
      }))
    : []

  const currentDate = getCurrentDate()
  const doneHabits = calcDoneHabits(habitsWithStreak, currentDate)
  store.dispatch(setHabits(habitsWithStreak))
  store.dispatch(setDoneHabits(doneHabits))

  return (
    <main className="container flex justify-center">
      <Preloader habits={habitsWithStreak} doneHabits={doneHabits} />
      {habitsWithStreak.length > 0 ? (
        <Habits habitsData={habitsWithStreak} />
      ) : (
        <NoHabitsYet />
      )}
    </main>
  )
}
