"use server"

import { revalidateTag } from "next/cache"
import getCurrentDate from "./getCurrentDate"
import { Habit, TaskByDate, User } from "@/types"
import { createClient } from "next-sanity"
import calcStreak from "./calcStreak"
import newDateObject from "./habit/newDateObject"

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
		const newDates = [...data.habit.dates, newDateObject(currentDate)]
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
		await editHabitDB(updatedHabit)
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
		await editHabitDB(updatedHabit)
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
	dates?: TaskByDate[],
	isGoogleTaskHabit: boolean = false
) {
	try {
		await sanityClint.create({
			_type: "habit",
			_id: habitId,
			name,
			bestStreak: 0,
			currentStreak: 0,
			isDeleted: false,
			user: {
				_type: "reference",
				_ref: userId,
			},
			slug: {
				_type: "slug",
				current: Date.now().toString(),
			},
			isGoogleTaskHabit,
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
		await editHabitDB(editedHabit)
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

export async function editUser(user: User) {
	try {
		await sanityClint.createOrReplace({
			_id: user._id,
			_type: "user",
			name: user.name,
			email: user.email,
			imglink: user.imglink,
			slug: {
				_type: "slug",
				current: user.slug.current,
			},
			googleListId: user.googleListId,
		})
	} catch (error) {
		console.log(error)
	}
}

export async function editHabitDB(habit: Habit) {
	try {
		await sanityClint.createOrReplace({
			_type: "habit",
			_id: habit._id,
			name: habit.name,
			bestStreak: habit.bestStreak,
			currentStreak: habit.currentStreak,
			isDeleted: habit.isDeleted ? habit.isDeleted : false,
			isGoogleTaskHabit: habit.isGoogleTaskHabit
				? habit.isGoogleTaskHabit
				: false,
			slug: {
				_type: "slug",
				current: habit.slug.current,
			},
			dates: habit.dates,
			user: {
				_type: "reference",
				_ref: habit.user._id,
			},
			category: {
				_type: "reference",
				_ref: habit.category._id,
			},
		})
	} catch (error) {
		console.log(error)
	}
}
