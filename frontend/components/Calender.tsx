"use client"

import { TaskByDate } from "@/typing"
import { useState } from "react"

const daysOfTheWeek = ["Sat", "Sun", "Mon", "Tue", "Wen", "Thu", "Fri"] as const
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const
const daysPerMonth = {
  January: 31,
  February: 28,
  March: 31,
  April: 30,
  May: 31,
  June: 30,
  July: 31,
  August: 31,
  September: 30,
  October: 31,
  November: 30,
  December: 31,
}
interface CalenderProps {
  dates: TaskByDate[]
}
export default function Calender({ dates }: CalenderProps) {
  const currentDate = new Date().toLocaleString().split(",")[0].split("/")
  const currentDay = currentDate[1]
  const currentMonth = currentDate[0]
  const currentYear = currentDate[2]
  const [monthIndex, setMonthIndex] = useState<number>(+currentMonth - 1)

  const completedDates = dates.map((date) => date.date.split("/"))
  const completedDays = completedDates.map((date) => +date[1])
  const completedMonths = completedDates.map((date) => +date[0])

  function check(
    days: number[],
    index: number,
    months: number[],
    monthI: number,
    style: string
  ) {
    for (let i = 0; i < days.length; i++) {
      if (days[i] === index && months[i] === monthI) {
        return style
      }
    }
  }

  return (
    <div className="w-fit m-3 p-5 rounded-xl border-4">
      <div className="flex mb-3 gap-2 items-center justify-center">
        <div
          className="w-3 h-3 bg-black"
          onClick={() => {
            setMonthIndex((p) => (p > 0 ? p - 1 : 11))
          }}
        ></div>
        <p className="w-20 text-center">{months[monthIndex]}</p>
        <div
          className="arrow w-3 h-3 bg-black"
          onClick={() => {
            setMonthIndex((p) => (p < 11 ? p + 1 : 0))
            console.log(monthIndex)
          }}
        ></div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {daysOfTheWeek.map((day) => (
          <p className="text-center" key={day}>
            {day}
          </p>
        ))}
        {[...Array(daysPerMonth[months[monthIndex]])].map((_, i) => (
          <div
            key={i}
            className={`
              flex
              items-center
              justify-center
              rounded-full
              w-8
              h-8
              ${check(
                completedDays,
                i + 1,
                completedMonths,
                monthIndex + 1,
                "!bg-black !text-white"
              )}
              ${
                +currentDay === i + 1 && +currentMonth - 1 === monthIndex
                  ? "bg-black bg-opacity-20 text-black"
                  : ""
              }
            `}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  )
}
