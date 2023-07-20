"use client"
import { Habit } from "@/types"
import Link from "next/link"
import HabitBox from "./HabitBox"
import { useEffect, useState } from "react"
import Image from "next/image"
import menu from "@/public/menu.svg"
import boxes from "@/public/view-tile.svg"
import add from "@/public/add.svg"
import doneImage from "@/public/done-img.svg"
import blobs from "@/public/layered-steps-haikei.svg"

interface TasksProps {
  habitsData: Habit[]
}

export default function Tasks({ habitsData }: TasksProps) {
  const [habits, setHabits] = useState<Habit[]>(habitsData)
  const [expandedView, setExpandedView] = useState<boolean>(false)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all")

  useEffect(() => {
    setHabits(habitsData)
  }, [habitsData])

  const categoriesWithHabits = habits[0]?.categories
    .map((category) => ({
      ...category,
      habits: habits.filter((habit) => habit?.category?._id === category._id),
    }))
    .reverse()

  return (
    <div className="my-3 w-[350px] max-w-[400px]">
      <div className="flex gap-2">
        <button
          className="my-2 p-[10px] rounded-lg bg-[color:var(--secondaryColor)] outline-none"
          onClick={() => setExpandedView((p) => !p)}
        >
          {expandedView ? (
            <Image src={boxes} height={20} width={20} alt="boxes view" />
          ) : (
            <Image src={menu} height={20} width={20} alt="expanded view" />
          )}
        </button>
        <Link
          href={"/create-habit"}
          className="w-fit inline-block outline-none"
        >
          <button className="bg-[color:var(--secondaryColor)] p-[10px] my-2 rounded-lg">
            <Image src={add} height={20} width={20} alt="add habit" />
          </button>
        </Link>
      </div>
      <div className="text-white relative flex bg-[color:var(--secondaryColor)] p-3 rounded-lg mb-2">
        <div className="absolute w-full h-[150px] overflow-hidden top-0 left-0 rounded-xl">
          <Image
            className="-translate-y-1"
            src={blobs}
            height={130}
            width={350}
            alt="done"
          />
        </div>
        <div className="flex-1 flex flex-col relative justify-center items-center">
          <p className="">You almost Done!</p>
          <p className="">
            <span className="">{0}</span>/
            <span className="">{habits.length}</span>
          </p>
        </div>
        <div className="mr-3 relatives">
          <Image
            className="relative"
            src={doneImage}
            height={120}
            width={120}
            alt="done"
          />
        </div>
      </div>
      {/* <div className="flex gap-2 mb-2">
        <div
          onClick={() => setSelectedCategoryId("all")}
          className="bg-[#b6b6b6] px-3 py-1 rounded-md"
        >
          <p className="">All Habits</p>
        </div>
        {categoriesWithHabits.map((category) => (
          <div
            className="bg-[#b6b6b6] px-3 py-1 rounded-md"
            key={category._id}
            onClick={() => setSelectedCategoryId(category._id)}
          >
            <p className="">{category.name}</p>
          </div>
        ))}
      </div> */}
      <div className="overflow-hidden">
        {categoriesWithHabits.map((category) => (
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
    </div>
  )
}
