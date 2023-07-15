"use client"
import { markHabit } from "@/lib/serverActions"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit, TaskByDate } from "@/types"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import calcStreak from "@/lib/calcStreak"

export default function HabitBox({ habit }: { habit: Habit }) {
  const [isPending, startTransition] = useTransition()
  const currentDate = getCurrentDate()
  const isCompleted = checkTheTaskIfCompleted(habit.dates, currentDate)
  const [isDone, setIsDone] = useState<boolean>(isCompleted)
  const [streak, setStreak] = useState<number>(habit.currentStreak)

  useEffect(() => {
    const isCompleted = checkTheTaskIfCompleted(habit.dates, currentDate)
    setIsDone(isCompleted)
    setStreak(habit.currentStreak)
  }, [habit])

  function calcExpectedStreak(dates: TaskByDate[]): number {
    //spared the array to make a new array without the reference to the old one
    const newDates = [...dates]
    if (isCompleted === false) {
      newDates.push({
        date: currentDate,
        _type: "dateOfHabit",
        _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
      })
      return calcStreak(newDates, currentDate.split("/"))
    } else {
      const newDates = dates.filter((d) => d.date !== currentDate)
      return calcStreak(newDates, currentDate.split("/"))
    }
  }

  return (
    <div className="text-white my-1 p-2 flex items-center justify-between">
      <button
        style={{
          background: isDone ? "rgb(245, 158, 11)" : "",
        }}
        className="w-6 h-6 mx-3 me-4 border border-amber-500 rounded-full"
        onClick={() => {
          setIsDone((p) => !p)
          setStreak(calcExpectedStreak(habit.dates))
          startTransition(() => markHabit({ habit, isCompleted }))
        }}
        type="submit"
        disabled={isPending}
      />
      <Link href={`habits/${habit.slug.current}`} className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-lg">{habit.name}</p>
          <p className="flex flex-col text-sm items-end">
            {streak}
            <span className="text-sm text-[#999999]">current streak</span>
          </p>
        </div>
      </Link>
    </div>
  )
}
