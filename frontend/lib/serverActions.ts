"use server"

import { revalidateTag } from "next/cache"
import getCurrentDate from "./getCurrentDate"
import { Habit } from "@/types"
import { createClient } from "next-sanity"

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

export default async function markHabit(data: FormDate) {
  const currentDate = getCurrentDate()

  // const data: FormDate = JSON.parse(e.get("habit") as string)

  if (data.isCompleted === false) {
    const newDates = data.habit.dates
    newDates.push({
      date: currentDate,
      _type: "dateOfHabit",
      _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
    })
    const updatedHabit: Habit = { ...data.habit, dates: newDates }
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
    // await fetch("https://dummyjson.com/todos")
    //   .then((res) => res.json())
    //   .then((d) => console.log(d))
    revalidateTag("habits")
    console.log("added")
  } else {
    const newDates = data.habit.dates.filter((d) => d.date !== currentDate)
    const updatedHabit: Habit = { ...data.habit, dates: newDates }
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
