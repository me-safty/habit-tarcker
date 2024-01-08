import { Habit } from "@/types"
import getCurrentDate from "../getCurrentDate"
import newDateObject from "./newDateObject"
import calcStreak from "../calcStreak"

const markHabitDone = async (
	habit: Habit,
	isCompleted: boolean,
	updateHabit: (updatedHabit: Habit) => Promise<void> | void,
	targetDate?: string,
	completeHabit?: () => void,
	unCompleteHabit?: () => void
) => {
	const currentDate = getCurrentDate(targetDate)
	if (isCompleted === false) {
		const newDates = [...habit.dates, newDateObject(currentDate)]
		const currentStreak = calcStreak(newDates)
		const bestStreak =
			habit.bestStreak > currentStreak ? habit.bestStreak : currentStreak
		const updatedHabit: Habit = {
			...habit,
			dates: newDates,
			currentStreak,
			bestStreak,
		}
		await updateHabit(updatedHabit)
		if (completeHabit) completeHabit()
	} else {
		const newDates = habit.dates.filter((d) => d.date !== currentDate)
		const currentStreak = calcStreak(newDates)
		const bestStreak =
			habit.bestStreak > currentStreak ? habit.bestStreak : currentStreak
		const updatedHabit: Habit = {
			...habit,
			dates: newDates,
			currentStreak,
			bestStreak,
		}
		await updateHabit(updatedHabit)
		if (unCompleteHabit) unCompleteHabit()
	}
}

export default markHabitDone
