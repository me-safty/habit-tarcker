"use client"
import { Habit } from "@/types"
import Link from "next/link"
import HabitBox from "./HabitBox"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { useEffect, useState } from "react"

interface TasksProps {
  habitsData: Habit[]
}

export default function Tasks({ habitsData }: TasksProps) {
  const currentDate = getCurrentDate()
  const [habits, setHabits] = useState<Habit[]>(habitsData)

  useEffect(() => {
    setHabits(habits)
  }, habitsData)

  function sortHabits(habits: Habit[]) {
    return habits.sort(
      (a, b) =>
        +checkTheTaskIfCompleted(a.dates, currentDate) -
        +checkTheTaskIfCompleted(b.dates, currentDate)
    )
  }

  const sortedHabitByCompetition = sortHabits(habits)

  return (
    <div className="my-3 w-[350px] max-w-[400px]">
      <div className="rounded-xl overflow-hidden mb-2">
        <div className="overflow-y-scroll max-h-[78vh] p-1 bg-[#202020]">
          {sortedHabitByCompetition.map((habit) => (
            <HabitBox
              habit={habit}
              habits={habits}
              sortHabits={sortHabits}
              setHabits={setHabits}
              key={habit.slug.current}
            />
          ))}
        </div>
      </div>
      <Link href={"/create-habit"}>
        <button className=" bg-amber-500 text-white text-3xl flex items-center justify-center rounded-full w-12 h-12">
          +
        </button>
      </Link>
    </div>
  )
}
