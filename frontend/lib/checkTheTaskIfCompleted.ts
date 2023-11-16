import { TaskByDate } from "@/types"

export default function checkTheTaskIfCompleted(
  dates: TaskByDate[],
  currentDate: string
): boolean {
  return Boolean(dates.find((d) => d.date === currentDate))
}
