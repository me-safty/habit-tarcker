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

export const daysOfTheWeek = [
  "Sun",
  "Mon",
  "Tue",
  "Wen",
  "Thu",
  "Fri",
  "Sat",
] as const

function getNameOfDay(i: number): string {
  const dayIndex = new Date(`${month}/${i}/${year}`).getDay()
  return daysOfTheWeek[dayIndex]
}

const daysOfTheMonthWithNames = [...Array(daysPerMonth[months[month + 1]])].map(
  (_, i) => ({
    day: i + 1,
    nameOdDay: getNameOfDay(i + 1),
  })
)

console.log(daysOfTheMonthWithNames)

export default function MiniCalender() {
  return (
    <div className="p-2 bg-[color:var(--secondaryColor)] text-white rounded-lg grid grid-cols-7">
      {daysOfTheWeek.map((day) => (
        <p className="text-center" key={day}>
          {day}
        </p>
      ))}
    </div>
  )
}
