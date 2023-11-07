import { GoogleHabit, Habit, TaskByDate } from "@/types"
import checkTheTaskIfCompleted from "../checkTheTaskIfCompleted"
import getCurrentDate from "../getCurrentDate"
import { markHabit } from "../serverActions"

export default function getUpdatedDatesForGoogleTask(
  task: GoogleHabit,
  googleDBHabit?: Habit
): TaskByDate[] | undefined {
  const currentDate = getCurrentDate(task.due)
  const newDate = {
    date: currentDate,
    _type: "dateOfHabit",
    _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
  }
  if (googleDBHabit) {
    const isCompleted = checkTheTaskIfCompleted(
      googleDBHabit.dates,
      currentDate
    )
    if (task.status === "completed") {
      if (isCompleted) {
        return googleDBHabit.dates
      } else if (isCompleted === false) {
        markHabit({
          habit: googleDBHabit,
          isCompleted,
        })
        return [...googleDBHabit.dates, newDate]
      }
    } else if (task.status === "needsAction") {
      if (isCompleted === false) {
        return googleDBHabit.dates
      } else if (isCompleted) {
        markHabit({
          habit: googleDBHabit,
          isCompleted,
        })
        return googleDBHabit.dates.filter((d) => d.date !== currentDate)
      }
    }
  } else if (task.status === "completed") {
    return [newDate]
  } else {
    return []
  }
}
