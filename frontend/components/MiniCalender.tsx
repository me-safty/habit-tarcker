import getCurrentDate from "@/lib/getCurrentDate"
import { months, getDaysInMonth } from "./Calender"
const currentDate = getCurrentDate().split("/")
const day = +currentDate[1]
const month = +currentDate[0]
const year = +currentDate[2]

const daysPerMonth = {
  January: getDaysInMonth(year, 1),
  February: getDaysInMonth(year, 2),
  March: getDaysInMonth(year, 3),
  April: getDaysInMonth(year, 4),
  May: getDaysInMonth(year, 5),
  June: getDaysInMonth(year, 6),
  July: getDaysInMonth(year, 7),
  August: getDaysInMonth(year, 8),
  September: getDaysInMonth(year, 9),
  October: getDaysInMonth(year, 10),
  November: getDaysInMonth(year, 11),
  December: getDaysInMonth(year, 12),
}

export const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"]

function getNameOfDay(i: number): string {
  const dayIndex = new Date(`${month}/${i}/${year}`).getDay()
  return daysOfTheWeek[dayIndex]
}

const daysOfTheMonthWithNames = [...Array(daysPerMonth[months[month + 1]])].map(
  (_, i) => ({
    dayIndex: i + 1,
    nameOdDay: getNameOfDay(i + 1),
  })
)

function gatWeekDays() {
  const currentWeek: {
    date: string
    nameOfDay: string
  }[] = []

  for (let i = 0; i < 7; i++) {
    let dayOfWeek = day - i
    const daysOfTheMonth = getDaysInMonth(year, month)
    let monthOfWeek = month

    if (dayOfWeek <= 1) {
      dayOfWeek = daysOfTheMonth

      if ((monthOfWeek = 12)) {
        monthOfWeek = 0
      } else {
        monthOfWeek -= 1
      }
    } else if (dayOfWeek >= daysOfTheMonth) {
      dayOfWeek = 1
      monthOfWeek += 1
    }

    currentWeek.push({
      date: `${monthOfWeek}/${dayOfWeek}/${year}`,
      nameOfDay: getNameOfDay(dayOfWeek),
    })
  }
  return currentWeek
}

daysOfTheMonthWithNames.forEach((d, i) => {
  if (d.dayIndex === day) {
    daysOfTheMonthWithNames.splice(i)
  }
})

console.log(daysOfTheMonthWithNames)

export default function MiniCalender() {
  return (
    <div className="p-2 bg-[color:var(--secondaryColor)] overflow-x-scroll text-white rounded-lg flex">
      {daysOfTheMonthWithNames.map((d) => (
        <div
          className={`text-center min-w-[${100 / 7}%]`}
          style={{ minWidth: "calc(100% / 7)" }}
          key={d.dayIndex}
          autoFocus={d.dayIndex === day ? true : false}
        >
          <p className="">{d.nameOdDay}</p>
          <p className="">{d.dayIndex}</p>
        </div>
      ))}
    </div>
  )
}
