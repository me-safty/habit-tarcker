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

  const categories = habits[0]?.categories

  return (
    <div className="my-3 w-[350px] max-w-[400px]">
      <div className="overflow-hidden">
        {categories.map((category) => (
          <div
            key={category._id}
            className=" max-h-[78vh] p-3 bg-[#202020] mb-2 rounded-xl"
          >
            <p className="text-white px-3 py-1 bg-[#333] mb-2 w-fit rounded-md">
              {category.name}
            </p>
            <div className="grid grid-cols-2 gap-2">
              {habits
                .filter((habit) => habit?.category?._id === category._id)
                .map((habit) => (
                  <HabitBox
                    habit={habit}
                    // habits={habits}
                    // sortHabits={sortHabits}
                    // setHabits={setHabits}
                    key={habit.slug.current}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
      <Link href={"/create-habit"} className="w-fit inline-block">
        <button className=" bg-amber-500 text-white text-3xl flex items-center justify-center rounded-full w-12 h-12">
          +
        </button>
      </Link>
    </div>
  )
}
