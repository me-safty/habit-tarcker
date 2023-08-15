"use client"
import { Habit } from "@/types"
import HabitBox from "./HabitBox"
import { useMemo } from "react"

export default function HabitsBox({
  habits,
  expandView,
}: {
  habits: Habit[]
  expandView: boolean
}) {
  const categoriesWithHabits = useMemo(
    () =>
      habits[0]?.categories
        .map((category) => ({
          ...category,
          habits: habits.filter(
            (habit) => habit?.category?._id === category._id
          ),
        }))
        .reverse(),
    [habits]
  )

  return (
    <section className="overflow-hidden">
      {categoriesWithHabits
        .filter((category) => category.habits.length > 0)
        .map((category) => (
          <div
            key={category._id}
            className="max-h-[78vh] p-2 bg-[color:var(--secondaryColor)] mb-2 rounded-xl"
          >
            <p className="text-white px-3 py-1 bg-[color:var(--mainColor)] mb-2 w-fit rounded-md">
              {category.name}
            </p>
            <div className="w-full h-[2px] bg-[color:var(--mainColor)] my-2 rounded-full"></div>
            <div
              className={`${
                expandView ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2"
              }`}
            >
              {category.habits.map((habit) => (
                <HabitBox
                  habit={habit}
                  key={habit.slug.current}
                  expanded={expandView}
                />
              ))}
            </div>
          </div>
        ))}
    </section>
  )
}