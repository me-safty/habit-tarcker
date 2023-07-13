"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import getCurrentDate from "./getCurrentDate"
import { Habit } from "@/types"
import { createClient } from "next-sanity"
import calcStreak from "./calcStreak"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
}

const sanityClint = createClient(config)

interface FormDate {
  habit: Habit
  isCompleted: boolean
}

export async function markHabit(data: FormDate) {
  const currentDate = getCurrentDate()

  // const data: FormDate = JSON.parse(e.get("habit") as string)

  if (data.isCompleted === false) {
    const newDates = data.habit.dates
    newDates.push({
      date: currentDate,
      _type: "dateOfHabit",
      _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
    })
    const currentStreak = calcStreak(newDates, currentDate.split("/"))
    const bestStreak =
      data.habit.bestStreak > currentStreak
        ? data.habit.bestStreak
        : currentStreak
    const updatedHabit: Habit = {
      ...data.habit,
      dates: newDates,
      currentStreak,
      bestStreak,
    }
    await sanityClint.createOrReplace({
      _type: "habit",
      _id: updatedHabit._id,
      name: updatedHabit.name,
      bestStreak: updatedHabit.bestStreak,
      currentStreak: updatedHabit.currentStreak,
      slug: {
        _type: "slug",
        current: updatedHabit.slug.current,
      },
      dates: updatedHabit.dates,
    })
    revalidateTag("habits")
    console.log("added")
  } else {
    const newDates = data.habit.dates.filter((d) => d.date !== currentDate)
    const currentStreak = calcStreak(newDates, currentDate.split("/"))
    const bestStreak =
      data.habit.bestStreak > currentStreak
        ? data.habit.bestStreak
        : currentStreak
    const updatedHabit: Habit = {
      ...data.habit,
      dates: newDates,
      currentStreak,
      bestStreak,
    }
    await sanityClint.createOrReplace({
      _type: "habit",
      _id: updatedHabit._id,
      name: updatedHabit.name,
      bestStreak: updatedHabit.bestStreak,
      currentStreak: updatedHabit.currentStreak,
      slug: {
        _type: "slug",
        current: updatedHabit.slug.current,
      },
      dates: updatedHabit.dates,
    })
    revalidateTag("habits")
    console.log("removed")
  }
}

export async function createHabit(e: FormData) {
  const name = e.get("name")?.toString()
  if (!name) return

  try {
    await sanityClint.create({
      _type: "habit",
      name,
      bestStreak: 0,
      currentStreak: 0,
      slug: {
        _type: "slug",
        current: Date.now().toString(),
      },
      dates: [],
    })
    revalidateTag("habits")
    console.log("revalidated")
  } catch (error) {
    console.log(error)
  }
}

export async function deleteHabit(id: string) {
  try {
    await sanityClint.delete(id)
    revalidateTag("habits")
    console.log("deleted")
  } catch (error) {
    console.log(error)
  }
}

// export async function editHabit(editedHabit: Habit) {
//   try {
//     await sanityClint.createOrReplace({
//       _type: "habit",
//       _id: editedHabit._id,
//       name: editedHabit.name,
//       bestStreak: editedHabit.bestStreak,
//       currentStreak: editedHabit.currentStreak,
//       slug: {
//         _type: "slug",
//         current: editedHabit.slug.current,
//       },
//       dates: editedHabit.dates,
//     })
//     revalidatePath(`/habits/${editedHabit.slug.current}`)
//     console.log("edited")
//   } catch (error) {
//     console.log(error)
//   }
// }
