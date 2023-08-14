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

export default function MiniCalender() {
  return (
    <section className="text-white rounded-lg flex">
      {gatWeekDays().map((d) => (
        <div
          className={`text-center min-w-[${100 / 7}%] p-1 px-[6px] `}
          style={{ minWidth: "calc(100% / 7)" }}
          key={d.dayIndex}
          autoFocus={+d.dayIndex === day ? true : false}
        >
          <p className="mb-2 text-white opacity-70">{d.nameOfDay}</p>
          <div
            className={`flex justify-center items-center w-[34px] h-[34px] rounded-full ${
              d.date === getCurrentDate()
                ? "bg-white border-[3px] border-[#0000] bg-opacity-10"
                : "border-[3px] border-[#7777775e]"
            }`}
          >
            <p>{d.dayIndex}</p>
          </div>
        </div>
      ))}
    </section>
  )
}
