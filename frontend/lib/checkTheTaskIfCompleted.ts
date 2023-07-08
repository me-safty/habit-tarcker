import { TaskByDate } from "@/types"

export default function checkTheTaskIfCompleted(dates: TaskByDate[]): boolean {
  const currentDate = new Date().toLocaleString().split(",")[0]
  let isDone = false
  dates.forEach((date) => {
    if (date.date === currentDate) {
      isDone = true
    }
  })
  return isDone
}
