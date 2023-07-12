"use client"
import markHabit from "@/lib/serverActions"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit } from "@/types"
import Link from "next/link"
import { useState, useTransition } from "react"

export default function HabitBox({ habit }: { habit: Habit }) {
  const [isPending, startTransition] = useTransition()
  const currentDate = getCurrentDate()
  const isCompleted = checkTheTaskIfCompleted(habit.dates, currentDate)
  const [isDone, setIsDone] = useState<boolean>(isCompleted)

  return (
    <div
      className="text-white my-1 p-2 flex items-center justify-between"
      style={{
        opacity: isPending ? 0.7 : 1,
      }}
    >
      <button
        style={{
          background: isDone ? "rgb(245, 158, 11)" : "",
        }}
        className="w-6 h-6 mx-3 me-4 border border-amber-500 rounded-full"
        onClick={() => {
          setIsDone((p) => !p)
          startTransition(() => markHabit({ habit, isCompleted }))
        }}
        type="submit"
      />
      <Link
        href={isPending ? "" : `habits/${habit.slug.current}`}
        className="flex-1"
      >
        <div className="flex justify-between items-center">
          <p className="text-lg">{habit.name}</p>
          <p className="flex flex-col text-sm items-end">
            {habit.currentStreak}
            <span className="text-sm text-[#999999]">current streak</span>
          </p>
        </div>
      </Link>
    </div>
  )
}
