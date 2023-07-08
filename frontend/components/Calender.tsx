"use client"

import { TaskByDate } from "@/types"
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

  const [year, setYear] = useState<number>(+currentYear)

  const completedDates = dates.map((date) => date.date.split("/"))
  const completedDays = completedDates.map((date) => +date[1])
  const completedMonths = completedDates.map((date) => +date[0])
  const completedYears = completedDates.map((date) => +date[2])

  function check(
    days: number[],
    index: number,
    months: number[],
    monthI: number,
    years: number[],
    yearI: number,
    style: string
  ) {
    for (let i = 0; i < days.length; i++) {
      if (days[i] === index && months[i] === monthI && years[i] === yearI) {
        return style
      }
    }
  }

  return (
    <div className="w-[315px] my-3 mt-5 p-5 rounded-xl bg-[#202020] text-[#6b6b6b]">
      <div className="flex px-3 mb-4 gap-2 items-center justify-center">
        <div
          className=" select-none border-8 border-amber-500 border-y-transparent border-s-transparent cursor-pointer"
          onClick={() => {
            setMonthIndex((p) => {
              if (p > 0) {
                return p - 1
              } else {
                setYear((p) => p - 1)
                return 11
              }
            })
          }}
        />
        <div className="w-full flex justify-center">
          <p
            className="px-4 py-1 select-none w-fit bg-[#2c2c2c] rounded-full text-center text-white font-bold"
            onDoubleClick={() => {
              setMonthIndex(+currentMonth - 1)
              setYear(+currentYear)
            }}
          >
            {months[monthIndex]}
            {year !== +currentYear ? ` ${year}` : ""}
          </p>
        </div>
        {year === +currentYear && +currentMonth === monthIndex + 1 ? (
          <div className="w-[16px] h-[16px]" />
        ) : (
          <div
            className=" select-none border-8 border-amber-500 border-y-transparent border-e-transparent cursor-pointer"
            onClick={() => {
              setMonthIndex((p) => {
                if (p < 11) {
                  return p + 1
                } else {
                  setYear((p) => p + 1)
                  return 0
                }
              })
            }}
          />
        )}
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
              font-semibold
              select-none
              ${check(
                completedDays,
                i + 1,
                completedMonths,
                monthIndex + 1,
                completedYears,
                year,
                "!bg-[#2c2c2c] !text-amber-500"
              )}
              ${
                +currentDay === i + 1 &&
                +currentMonth - 1 === monthIndex &&
                +currentYear === year
                  ? "bg-[#2c2c2c]"
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
