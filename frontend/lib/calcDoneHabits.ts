import { Habit } from "@/types"

export default function calcDoneHabits(
  habits: Habit[],
  currentDate: string
): number {
  let doneHabits = 0
  habits.forEach((habit) => {
    habit.dates.forEach((date) => {
      if (date.date === currentDate) {
        doneHabits++
      }
    })
  })
  return doneHabits
}
