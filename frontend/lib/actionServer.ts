"use server"

import { Task } from "@/types"
import { revalidatePath } from "next/cache"

export async function addHabitToDB(habit: Task) {
  const currentDate = new Date().toLocaleString().split(",")[0].split("/")
  const newDates = habit.dates
  newDates.push({
    date: currentDate.join("/"),
    _type: "dateOfHabit",
    _key: `${Math.random().toString(32).slice(2)}-${currentDate.join("/")}`,
  })
  await fetch(`${process.env.URL}/api/habit-done`, {
    method: "PUT",
    body: JSON.stringify({
      _id: habit._id,
      name: habit.name,
      bestStreak: habit.bestStreak,
      currentStreak: habit.currentStreak,
      slug: habit.slug.current,
      dates: habit.dates,
    }),
  })
  revalidatePath(`task/${habit.slug.current}`)
  console.log("done")
}
