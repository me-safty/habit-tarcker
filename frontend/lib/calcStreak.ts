import { TaskByDate } from "@/types"
import { useMemo } from "react"

export default function calcStreak(
  dates: TaskByDate[],
  currentDate: string[]
): number {
  const currentDay = +currentDate[1]
  // const currentMonth = +currentDate[0]
  // const currentYear = +currentDate[2]

  let streak = 0

  const sortedDates = dates
    .map((d) => new Date(d.date).getTime())
    .sort()
    .map(
      (d) =>
        `${new Date(d).getMonth() + 1}/${new Date(d).getDate()}/${new Date(
          d
        ).getFullYear()}`
    )
    .reverse()

  for (let i = 0; i < sortedDates.length; i++) {
    const lastDayInTheStreak = +sortedDates[0].split("/")[1]
    const day = +sortedDates[i].split("/")[1]
    const preDay = +sortedDates[i + 1]?.split("/")[1]
    const nextDay = +sortedDates[i - 1]?.split("/")[1]

    if (
      lastDayInTheStreak === currentDay ||
      lastDayInTheStreak === currentDay - 1
    ) {
      if (day === currentDay) {
        streak++
      } else if (day - preDay === 1 && i === 0) {
        streak++
      } else if (nextDay - day === 1) {
        streak++
      } else if (
        nextDay === 1 &&
        (day === 28 || day === 29 || day === 30 || day === 31)
      ) {
        streak++
      } else {
        break
      }
    }
  }
  if (streak === 1) {
    return 0
  }

  return streak
}
