import Habits from "@/components/habits/Habits"
import Preloader from "@/components/Preloader"
import calcDoneHabits from "@/lib/calcDoneHabits"
import getCurrentDate from "@/lib/getCurrentDate"
import { store } from "@/store"
import { setCategories, setDoneHabits, setHabits } from "@/store/habitsSlice"
import { Category, GoogleCategories, GoogleHabits, Habit, User } from "@/types"
import { getServerSession } from "next-auth"
import options from "./api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"
import NoHabitsYet from "@/components/habits/NoHabitsYet"
import calcStreak from "@/lib/calcStreak"
import transformGoogleTaskToHabit from "@/lib/transformGoogleTasksToHabit"
import { createHabitData, editHabit, editUser } from "@/lib/serverActions"
import getUpdatedDatesForGoogleTask from "@/lib/habit/getUpdatedDatesForGoogleTask"

async function getHabits(email: string, token: string) {
  // *[_type == "habit" && dates[].date match "11/16/2023"] {
  //   "dates": dates[].date
  // }

  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "user" && email == $email][0] {
    "user": {
      ...
    },
    "categories": *[_type == "category" ],
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
  const response = await res.json()
  const habits: Habit[] = response.result.habits
  const categories: Category[] = response.result.categories
  const user: User = response.result.user
  if (!habits) {
    return
  }
  let listId
  if (user?.googleListId) {
    listId = user?.googleListId
  } else {
    const lists = await gatGoogleTaskLists(token)
    listId = lists?.items.find((list) => list.title === "Tasks")?.id as string
    if (listId) {
      await editUser({ ...user, googleListId: listId })
    }
  }
  if (listId) {
    return {
      habits: await getHabitsWIthGoogleTasks(
        habits,
        categories,
        user,
        token,
        listId
      ),
      categories,
      user,
    }
  } else {
    return {
      habits,
      categories,
      user,
    }
  }
  // await getGoogleMainTasks(token)
}

async function getHabitsWIthGoogleTasks(
  habits: Habit[],
  categories: Category[],
  user: User,
  token: string,
  listId: string
) {
  const filteredValues = ["id", "title", "status", "due"].join()
  try {
    const res = await fetch(
      `https://tasks.googleapis.com/tasks/v1/lists/${listId}/tasks?showCompleted=true&maxResults=100&showHidden=true&fields=items(${filteredValues})`,
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
    const googleTasksHabits = googleTasks.items
      .filter((task) => task?.due)
      .map((task) => {
        const googleDBHabit = googleDBHabits.find(
          (habit) => habit.name === task.title
        )
        const dates = getUpdatedDatesForGoogleTask(task, googleDBHabit as Habit)
        if (googleDBHabit) {
          return { ...googleDBHabit, dates }
        } else {
          const newHabit = transformGoogleTaskToHabit(
            {
              ...task,
              dates,
            },
            user,
            categories
          )
          createHabitData(
            newHabit.name,
            newHabit._id,
            newHabit.user._id,
            newHabit.category._id,
            newHabit.dates
          )
          return newHabit
        }
      })
    const deletedHabits = googleDBHabits.filter(
      (DBHabit) =>
        DBHabit?.isDeleted === false &&
        googleTasksHabits.find((gHabit) => DBHabit._id === gHabit._id) ===
          undefined
    )
    if (deletedHabits.length > 0) {
      deletedHabits.forEach((habit) => editHabit({ ...habit, isDeleted: true }))
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

// async function getGoogleMainTasks(token: string) {
//   const mainTasksListId = "Z21pcUlJUUlmelVBZzN6VA"
//   const res = await fetch(
//     `https://tasks.googleapis.com/tasks/v1/lists/${mainTasksListId}/tasks?showCompleted=true&maxResults=100&showHidden=true`,
//     {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   )
//   const googleTasks: GoogleHabits = await res.json()
//   console.log(googleTasks)
// }

async function gatGoogleTaskLists(token: string) {
  try {
    const res = await fetch(
      "https://tasks.googleapis.com/tasks/v1/users/@me/lists",
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const googleLists: GoogleCategories = await res.json()
    return googleLists
  } catch (error) {
    console.log(error)
  }
}

export default async function Home() {
  const session: any = await getServerSession(options)

  if (!session || session.error) {
    redirect("/api/auth/signin?callbackUrl=/")
  }
  const data = (await getHabits(
    session?.user?.email as string,
    session?.accessToken
  )) as {
    habits: Habit[]
    user: User
    categories: Category[]
  }
  const habitsWithStreak = data?.habits
    ? data.habits.map((habit) => ({
        ...habit,
        currentStreak: calcStreak(habit.dates),
      }))
    : []

  const currentDate = getCurrentDate()
  const doneHabits = calcDoneHabits(habitsWithStreak, currentDate)
  store.dispatch(setHabits(habitsWithStreak))
  store.dispatch(setDoneHabits(doneHabits))
  store.dispatch(setCategories(data.categories))

  return (
    <main className="container flex justify-center">
      <Preloader
        habits={habitsWithStreak}
        categories={data.categories}
        doneHabits={doneHabits}
      />
      {habitsWithStreak.length > 0 ? (
        <Habits
          habitsData={habitsWithStreak}
          categoriesData={data.categories}
        />
      ) : (
        <NoHabitsYet />
      )}
    </main>
  )
}
