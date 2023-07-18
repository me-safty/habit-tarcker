"use client"
import { markHabit } from "@/lib/serverActions"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit, TaskByDate } from "@/types"
import Link from "next/link"
import { useEffect, useState, useTransition } from "react"
import calcStreak from "@/lib/calcStreak"

export default function HabitBox({
  habit,
  expanded = false,
}: {
  habit: Habit
  expanded?: boolean
}) {
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

  function calcExpectedNewDates(dates: TaskByDate[]): TaskByDate[] {
    //spared the array to make a new array without the reference to the old one
    if (isCompleted === false) {
      const newDates = [...dates]
      newDates.push({
        date: currentDate,
        _type: "dateOfHabit",
        _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
      })
      return newDates
    } else {
      return dates.filter((d) => d.date !== currentDate)
    }
  }

  return (
    <div
      className={`${expanded ? "ps-1 pe-2" : ""} ${
        isDone ? "opacity-60" : "opacity-100"
      } text-white rounded-lg bg-[#333] py-2 flex items-center justify-between`}
    >
      <button
        style={{
          background: isDone ? "rgb(245, 158, 11)" : "",
        }}
        className="w-5 h-5 mx-2 border border-amber-500 rounded-full"
        onClick={() => {
          setIsDone((p) => !p)
          setStreak(
            calcStreak(
              calcExpectedNewDates(habit.dates),
              currentDate.split("/")
            )
          )
          // setHabits(expectNewHabitsPositions(habits))
          startTransition(() => markHabit({ habit, isCompleted }))
        }}
        type="submit"
        disabled={isPending}
      />
      <Link href={`habits/${habit.slug.current}`} className="flex-1">
        <div className="flex justify-between items-center overflow-hidden">
          <p
            className="text-[15px]"
            style={{
              // height: "calc(1 * 1rem * 1.25)",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: "1",
            }}
          >
            {habit.name}
          </p>
          {expanded && (
            <p className="flex flex-col text-sm items-end">
              {streak}
              <span className="text-sm text-[#999999]">current streak</span>
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
