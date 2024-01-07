import { Category, GoogleHabit, Habit, TaskByDate, User } from "@/types"
// import getCurrentDate from "./getCurrentDate"

interface GoogleHabitWithDates extends GoogleHabit {
	dates?: TaskByDate[]
}
export default function transformGoogleTaskToHabit(
	task: GoogleHabitWithDates,
	user: User,
	categories: Category[]
): Habit {
	const othersCat: Category = {
		_id: "33f74555-fc90-498d-adb4-adda0d23ca73",
		_rev: "ozYWAyX9WuVST7QtTEIYGz",
		_type: "category",
		name: "others",
	}
	return {
		_id: task.id,
		_createdAt: task.due,
		name: task.title,
		bestStreak: 0,
		currentStreak: 0,
		dates: task?.dates ? task?.dates : [],
		slug: {
			current: Date.now().toString(),
		},
		category: othersCat,
		isGoogleTaskHabit: true,
		categories,
		user,
	}
}
