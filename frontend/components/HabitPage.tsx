"use client"
import { Habit } from "@/types"
import Calender from "./Calender"
import calcStreak from "@/lib/calcStreak"
import { useState } from "react"
import getCurrentDate from "@/lib/getCurrentDate"

interface TaskPageProps {
  habitData: Habit
}

export default function TaskPage({ habitData }: TaskPageProps) {
  const currentDate = getCurrentDate()

  const [habit, setHabit] = useState<Habit>(habitData)
  // const [isDone, setIsDone] = useState<boolean>(
  //   habit.dates.some((d) => d.date === currentDate)
  // )

  // async function habitDone() {
  //   if (isDone === false) {
  //     const newDates = habit.dates
  //     newDates.push({
  //       date: currentDate,
  //       _type: "dateOfHabit",
  //       _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
  //     })

  //     setHabit({ ...habit, dates: newDates })
  //     setIsDone(habit.dates.some((d) => d.date === currentDate))

  //     await fetch("/api/habit-done", {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         _id: habit._id,
  //         name: habit.name,
  //         bestStreak: habit.bestStreak,
  //         currentStreak: habit.currentStreak,
  //         slug: habit.slug.current,
  //         dates: habit.dates,
  //       }),
  //     })
  //   }
  // }
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="bg-[#202020] mt-3 w-full text-lg font-semibold text-center rounded-lg p-3 text-white">
        {habit.name}
      </div>
      <Calender dates={habit.dates} />
      <div className="grid grid-cols-2 gap-3 bg-[#202020] w-[315px] rounded-xl p-3">
        <div className="p-3 bg-[#363636] bg-opacity-40 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Total completion</p>
          <p className="font-bold text-xl">
            {habit.dates.length} <span className="text-sm">Count</span>
          </p>
        </div>
        <div className="p-3 bg-[#363636] bg-opacity-50 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Current Streak</p>
          <p className="font-bold text-xl">
            {calcStreak(habit.dates, currentDate.split("/"))}{" "}
            <span className="text-sm">Days</span>
          </p>
        </div>
        <div className="p-3 bg-[#363636] bg-opacity-50 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Best Streak</p>
          <p className="font-bold text-xl">
            {habit.bestStreak} <span className="text-sm">Days</span>
          </p>
        </div>
      </div>
      {/* <button
        className={`text-white relative p-2 bg-amber-500 my-3 rounded-lg w-full max-w-[315px] ${
          isDone
            ? `
          opacity-50
          before:content-[""]
          before:absolute
          before:top-[50%]
          before:left-[50%]
          before:-translate-x-[50%]
          before:-translate-y-[50%]
          before:w-[100px]
          before:h-[3px]
          before:bg-white
          before:rounded-xl
          `
            : ""
        }`}
        disabled={isDone}
        onClick={() => habitDone()}
      >
        Done
      </button> */}
    </div>
  )
}
