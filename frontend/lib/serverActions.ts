"use server"

import { revalidateTag } from "next/cache"
import getCurrentDate from "./getCurrentDate"
import { Habit, TaskByDate } from "@/types"
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

export async function markHabit(data: FormDate, targetDate?: string) {
  const currentDate = getCurrentDate(targetDate)
  // const data: FormDate = JSON.parse(e.get("habit") as string)
  if (data.isCompleted === false) {
    const newDates = [
      ...data.habit.dates,
      {
        date: currentDate,
        _type: "dateOfHabit",
        _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
      },
    ]
    const currentStreak = calcStreak(newDates)

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
      user: {
        _type: "reference",
        _ref: updatedHabit.user._id,
      },
      currentStreak: updatedHabit.currentStreak,
      slug: {
        _type: "slug",
        current: updatedHabit.slug.current,
      },
      // isDeleted: false,
      dates: updatedHabit.dates,
      category: {
        _type: "reference",
        _ref: updatedHabit.category._id,
      },
    })
    revalidateTag("habits")
    console.log("added")
  } else {
    const newDates = data.habit.dates.filter((d) => d.date !== currentDate)
    const currentStreak = calcStreak(newDates)
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
      // isDeleted: false,
      user: {
        _type: "reference",
        _ref: updatedHabit.user._id,
      },
      category: {
        _type: "reference",
        _ref: updatedHabit.category._id,
      },
    })
    revalidateTag("habits")
    console.log("removed")
  }
}

export async function createHabit(e: FormData) {
  const name = e.get("name")?.toString()
  const categoryId = e.get("categoryId")?.toString()
  const userId = e.get("sessionId")?.toString()
  if (!name && !categoryId && !userId) return

  try {
    await sanityClint.create({
      _type: "habit",
      name,
      bestStreak: 0,
      currentStreak: 0,
      user: {
        _type: "reference",
        _ref: userId,
      },
      isDeleted: false,
      slug: {
        _type: "slug",
        current: Date.now().toString(),
      },
      dates: [],
      category: {
        _type: "reference",
        _ref: categoryId,
      },
    })
    revalidateTag("habits")
    console.log("revalidated")
  } catch (error) {
    console.log(error)
  }
}

export async function createHabitData(
  name: string,
  habitId: string,
  userId: string,
  categoryId: string,
  dates?: TaskByDate[]
) {
  try {
    await sanityClint.create({
      _type: "habit",
      _id: habitId,
      name,
      bestStreak: 0,
      currentStreak: 0,
      // isDeleted: false,
      user: {
        _type: "reference",
        _ref: userId,
      },
      slug: {
        _type: "slug",
        current: Date.now().toString(),
      },
      dates,
      category: {
        _type: "reference",
        _ref: categoryId,
      },
    })
    revalidateTag("habits")
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

export async function editHabit(editedHabit: Habit) {
  try {
    await sanityClint.createOrReplace({
      _type: "habit",
      _id: editedHabit._id,
      name: editedHabit.name,
      bestStreak: editedHabit.bestStreak,
      currentStreak: editedHabit.currentStreak,
      isDeleted: editedHabit.isDeleted ? editedHabit.isDeleted : false,
      slug: {
        _type: "slug",
        current: editedHabit.slug.current,
      },
      dates: editedHabit.dates,
      user: {
        _type: "reference",
        _ref: editedHabit.user._id,
      },
      category: {
        _type: "reference",
        _ref: editedHabit.category._id,
      },
    })
    revalidateTag("habits")
    console.log("edited")
  } catch (error) {
    console.log(error)
  }
}
export async function createCategory(name: string) {
  try {
    await sanityClint.create({
      _type: "category",
      name,
    })
  } catch (error) {
    console.log(error)
  }
}
