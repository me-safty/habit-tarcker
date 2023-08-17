"use client"

import getCurrentDate from "@/lib/getCurrentDate"
import { getDaysInMonth } from "../habit/Calender"
import { useAppDispatch, useAppSelector } from "./Habits"
import { setCalenderDate, setDoneHabits } from "@/store/habitsSlice"
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"
import calcDoneHabits from "@/lib/calcDoneHabits"

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
  const dispatch = useAppDispatch()
  const calenderDate = useAppSelector((state) => state.habits.calenderDate)
  const habits = useAppSelector((state) => state.habits.allHabits)

  return (
    <section className="text-white rounded-lg mb-1 flex">
      {gatWeekDays().map((d) => (
        <section
          className={`text-center min-w-[${
            100 / 7
          }%] py-2 px-[6px] cursor-pointer `}
          style={{ minWidth: "calc(100% / 7)" }}
          key={d.dayIndex}
          onClick={() => {
            dispatch(setCalenderDate(d.date))
            dispatch(setDoneHabits(calcDoneHabits(habits, d.date)))
          }}
        >
          <p className={`mb-2 text-white  opacity-70`}>{d.nameOfDay}</p>
          {/* <div 
            className={`flex justify-center items-center w-[34px] h-[34px] rounded-full ${
              d.date === calenderDate
                ? "bg-white border-[3px] border-[#0000] bg-opacity-10"
                : "border-[3px] border-[#7777775e]"
            }`}
          >
          </div> */}
          <CircularProgressbarWithChildren
            value={(calcDoneHabits(habits, d.date) / habits.length) * 100}
            background
            styles={buildStyles({
              pathColor: `${
                d.date === calenderDate ? "#0000" : "rgb(248, 180, 0)"
              }`,
              trailColor: `${d.date !== calenderDate ? "#f8b40033" : "#0000"}`,
              backgroundColor: `${
                d.date === calenderDate ? "#f8b4003d" : "#0000"
              }`,
            })}
          >
            <p>{d.dayIndex}</p>
          </CircularProgressbarWithChildren>
        </section>
      ))}
    </section>
  )
}
