import { Habit } from "@/types"
import getCurrentDate from "./getCurrentDate"

const currentDate = getCurrentDate()

export default function calcDoneHabits(habits: Habit[]): number {
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
