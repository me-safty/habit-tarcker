import { TaskByDate } from "@/types"

export default function checkTheTaskIfCompleted(
  dates: TaskByDate[],
  currentDate: string
): boolean {
  let isDone = false
  dates.forEach((date) => {
    if (date.date === currentDate) {
      isDone = true
    }
  })
  return isDone
}
