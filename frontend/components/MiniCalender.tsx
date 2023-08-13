import getCurrentDate from "@/lib/getCurrentDate"
import { getDaysInMonth } from "./Calender"
const currentDate = getCurrentDate().split("/")
const day = +currentDate[1]
const month = +currentDate[0]
const year = +currentDate[2]

export const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]

function getNameOfDay(i: number, month: number): string {
  const dayIndex = new Date(`${month}/${i}/${year}`).getDay()
  return daysOfTheWeek[dayIndex]
}

function gatWeekDays() {
  const currentWeek: {
    dayIndex: number
    date: string
    nameOfDay: string
  }[] = []

  let c = 0
  let monthOfWeek = month
  let d = false
  for (let i = 0; i < 7; i++) {
    let dayOfWeek = day - i
    const daysOfTheMonth = getDaysInMonth(year, monthOfWeek)

    if (dayOfWeek < 1) {
      if (!d) {
        monthOfWeek -= 1
      }
      d = true
      dayOfWeek = daysOfTheMonth - c
      c++
    }

    currentWeek.push({
      dayIndex: dayOfWeek,
      date: `${monthOfWeek}/${dayOfWeek}/${year}`,
      nameOfDay: getNameOfDay(dayOfWeek, monthOfWeek),
    })
  }
  return currentWeek.reverse()
}

console.log(gatWeekDays())

export default function MiniCalender() {
  return (
    <div className="p-2 bg-[color:var(--secondaryColor)] overflow-x-scroll text-white rounded-lg flex">
      {gatWeekDays().map((d) => (
        <div
          className={`text-center min-w-[${100 / 7}%] rounded-full p-1 px-2 ${
            d.date === getCurrentDate() ? "bg-white bg-opacity-20" : ""
          }`}
          style={{ minWidth: "calc(100% / 7)" }}
          key={d.dayIndex}
          autoFocus={+d.dayIndex === day ? true : false}
        >
          <p className="">{d.nameOfDay}</p>
          <p className="">{d.dayIndex}</p>
        </div>
      ))}
    </div>
  )
}
