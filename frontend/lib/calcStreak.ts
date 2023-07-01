import { TaskByDate } from "@/typing"

const currentDate = new Date().toLocaleString().split(",")[0].split("/")
const currentDay = +currentDate[1]
const currentMonth = +currentDate[0]
const currentYear = +currentDate[2]

export default function calcStreak(dates: TaskByDate[]): number {
  let streak = 0
  const sortedDates = dates
    .map((d) => new Date(d.date).getTime())
    .sort()
    .map((d) => new Date(d).toLocaleString().split(",")[0])
    .reverse()

  // console.log(sortedDates)

  for (let i = 0; i < sortedDates.length; i++) {
    const day = +sortedDates[i].split("/")[1]
    const preDay = +sortedDates[i + 1]?.split("/")[1]
    const nextDay = +sortedDates[i - 1]?.split("/")[1]
    const month = +sortedDates[i].split("/")[0]
    const prevMonth = +sortedDates[i + 1]?.split("/")[0]
    const nextMonth = +sortedDates[i - 1]?.split("/")[0]
    const year = +sortedDates[i].split("/")[2]
    // console.log(
    //   day,
    //   currentDay,
    //   preDay,
    //   nextDay,
    //   month,
    //   prevMonth,
    //   nextMonth,
    //   currentMonth
    // )
    if (day === 1 && month === prevMonth + 1) {
      streak++
    } else if (day - preDay === 1 && month + 1 === nextMonth) {
      streak++
    } else if (day === currentDay && month === currentMonth) {
      streak++
    } else if (nextDay - 1 === day) {
      streak++
    } else {
      break
    }
    // console.log(streak)
  }
  return streak
}
