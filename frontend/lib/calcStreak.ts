import { TaskByDate } from "@/typing"

export default function calcStreak(
  dates: TaskByDate[],
  currentDate: string[]
): number {
  const currentDay = +currentDate[1]
  const currentMonth = +currentDate[0]
  const currentYear = +currentDate[2]

  let streak = 0
  const sortedDates = dates
    .map((d) => new Date(d.date).getTime())
    .sort()
    .map((d) => new Date(d).toLocaleString().split(",")[0])
    .reverse()

  for (let i = 0; i < sortedDates.length; i++) {
    const lastDayInTheStreak = +sortedDates[0].split("/")[1]
    const day = +sortedDates[i].split("/")[1]
    const preDay = +sortedDates[i + 1]?.split("/")[1]
    const nextDay = +sortedDates[i - 1]?.split("/")[1]
    const month = +sortedDates[i].split("/")[0]
    const prevMonth = +sortedDates[i + 1]?.split("/")[0]
    const nextMonth = +sortedDates[i - 1]?.split("/")[0]
    const year = +sortedDates[i].split("/")[2]
    // console.log(
    //   "lastDayInTheStreak:",
    //   lastDayInTheStreak,
    //   "day:",
    //   day,
    //   "curreny day:",
    //   currentDay,
    //   "preday:",
    //   preDay,
    //   "nextDay:",
    //   nextDay,
    //   "month:",
    //   month,
    //   "premonth:",
    //   prevMonth,
    //   "nextmonth:",
    //   nextMonth,
    //   "\n",
    //   sortedDates
    //   // currentMonth
    // )
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
      } else if (nextDay === 1 && (day === 30 || day === 31)) {
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
