"use client"
import { markHabit } from "@/lib/serverActions"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit, TaskByDate } from "@/types"
import Link from "next/link"
import { useEffect, useMemo, useState, useTransition } from "react"
import calcStreak from "@/lib/calcStreak"
import { useAppDispatch, useAppSelector } from "./Habits"
import { setDoneHabits } from "@/store/habitsSlice"

export default function HabitBox({
  habit,
  expanded = false,
}: {
  habit: Habit
  expanded?: boolean
}) {
  const dispatch = useAppDispatch()
  let doneHabits = useAppSelector((state) => state.habits.doneHabits)

  const [isPending, startTransition] = useTransition()
  const currentDate = getCurrentDate()
  const isCompleted = checkTheTaskIfCompleted(habit.dates, currentDate)
  const [isDone, setIsDone] = useState<boolean>(isCompleted)
  const [streak, setStreak] = useState<number>(habit.currentStreak)

  useEffect(() => {
    const isCompleted = checkTheTaskIfCompleted(habit.dates, currentDate)
    setIsDone(isCompleted)
    setStreak(habit.currentStreak)
  }, [habit, currentDate])

  const cashedStreak = useMemo(() => {
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
    return calcStreak(calcExpectedNewDates(habit.dates), currentDate.split("/"))
  }, [habit.dates, currentDate, isCompleted])

  return (
    <section
      className={`${expanded ? "ps-1 pe-2" : ""} ${
        isDone ? "opacity-80" : "opacity-100"
      } text-white rounded-lg bg-[color:var(--mainColor)] py-2 flex items-center justify-between`}
    >
      <button
        aria-label="complete-the-habit"
        className={`w-5 h-5 mx-2 border border-[color:var(--checkColor)] rounded-full ${
          isDone ? "bg-[color:var(--checkColor)]" : ""
        }`}
        onClick={() => {
          setIsDone((p) => !p)
          setStreak(cashedStreak)
          dispatch(setDoneHabits(isDone ? doneHabits - 1 : doneHabits + 1))
          startTransition(() => markHabit({ habit, isCompleted }))
        }}
        type="submit"
        disabled={isPending}
      />
      <Link href={`habits/${habit.slug.current}`} className="flex-1">
        <div className="flex justify-between items-center overflow-hidden">
          <p
            className={`${expanded ? "text-lg" : "text-[15px]"}`}
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
    </section>
  )
}
