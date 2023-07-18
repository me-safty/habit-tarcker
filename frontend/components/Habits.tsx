"use client"
import { Habit } from "@/types"
import Link from "next/link"
import HabitBox from "./HabitBox"
import { useEffect, useState } from "react"
import menu from "@/public/menu.svg"
import boxes from "@/public/view-tile.svg"
import Image from "next/image"

interface TasksProps {
  habitsData: Habit[]
}

export default function Tasks({ habitsData }: TasksProps) {
  const [habits, setHabits] = useState<Habit[]>(habitsData)
  const [expandedView, setExpandedView] = useState<boolean>(true)

  useEffect(() => {
    setHabits(habits)
  }, habitsData)

  const categoriesWithHabits = habits[0]?.categories
    .map((category) => ({
      ...category,
      habits: habits.filter((habit) => habit?.category?._id === category._id),
    }))
    .reverse()

  return (
    <div className="my-3 w-[350px] max-w-[400px]">
      <button
        className="my-2 p-2 rounded-lg bg-[#202020] outline-none"
        onClick={() => setExpandedView((p) => !p)}
      >
        {expandedView ? (
          <Image src={menu} height={20} width={20} alt="expanded view" />
        ) : (
          <Image src={boxes} height={20} width={20} alt="boxes view" />
        )}
      </button>
      <div className="overflow-hidden">
        {categoriesWithHabits.map((category) => (
          <div
            key={category._id}
            className="max-h-[78vh] p-3 bg-[#202020] mb-2 rounded-xl"
          >
            <p className="text-white px-3 py-1 bg-[#333] mb-2 w-fit rounded-md">
              {category.name}
            </p>
            <div className="w-full h-[2px] bg-[#333] my-2 rounded-full"></div>
            <div
              className={`${
                expandedView ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2"
              }`}
            >
              {category.habits.map((habit) => (
                <HabitBox
                  habit={habit}
                  key={habit.slug.current}
                  expanded={expandedView}
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
