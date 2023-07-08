import { TaskByDate } from "@/types"

export default function checkTheTaskIfCompleted(dates: TaskByDate[]): boolean {
  const date = new Date()
  const currentDate = `${
    date.getMonth() + 1
  }/${date.getDate()}/${date.getFullYear()}`
  let isDone = false
  dates.forEach((date) => {
    if (date.date === currentDate) {
      isDone = true
    }
  })
  return isDone
}
