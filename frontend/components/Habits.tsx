"use client"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit, TaskByDate } from "@/types"
import Link from "next/link"
import { useRouter } from "next/navigation"
import React, { useState } from "react"

interface TasksProps {
  tasks: Habit[]
}

export default function Tasks({ tasks }: TasksProps) {
  const currentDate = getCurrentDate()
  const router = useRouter()
  const [habits, setHabits] = useState<Habit[]>(tasks)

  async function markHabitDone(habit: Habit, isDone: boolean) {
    let newHabit: Habit = habit

    async function updateHabitToDB() {
      await fetch("/api/habit-done", {
        method: "PUT",
        body: JSON.stringify({
          _id: newHabit._id,
          name: newHabit.name,
          bestStreak: newHabit.bestStreak,
          currentStreak: newHabit.currentStreak,
          slug: newHabit.slug.current,
          dates: newHabit.dates,
        }),
      })

      router.replace("/")
    }

    function getNewHabits(habits: Habit[], newDates: TaskByDate[]): Habit[] {
      return habits.map((currentHabit) => {
        if (currentHabit._id === habit._id) {
          newHabit = { ...currentHabit, dates: newDates }
          return newHabit
        } else {
          return currentHabit
        }
      })
    }

    if (isDone === false) {
      const newDates = habit.dates
      newDates.push({
        date: currentDate,
        _type: "dateOfHabit",
        _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
      })
      const newHabits = getNewHabits(habits, newDates)
      setHabits(newHabits)
      updateHabitToDB()
    } else {
      const newDates = habit.dates.filter((d) => d.date !== currentDate)
      const newHabits = getNewHabits(habits, newDates)
      setHabits(newHabits)
      updateHabitToDB()
    }
  }

  return (
    <div className="my-3 max-w-[400px]">
      <div className="my-3 rounded-xl p-1 bg-[#202020]">
        {habits.map((task, i) => {
          const isCompleted = checkTheTaskIfCompleted(task.dates, currentDate)
          return (
            <div
              key={i}
              className="text-white my-1 p-2 flex items-center justify-between"
            >
              <button
                style={{
                  background: isCompleted ? "rgb(245, 158, 11)" : "",
                }}
                className="w-6 h-6 mx-3 me-4 border border-amber-500 rounded-full"
                onClick={() => markHabitDone(task, isCompleted)}
              />
              <Link href={`habits/${task.slug.current}`} className="flex-1">
                <div className="flex justify-between items-center">
                  <p className="text-lg">{task.name}</p>
                  <p className="flex flex-col text-sm items-end">
                    {task.currentStreak}
                    <span className="text-sm text-[#999999]">
                      current streak
                    </span>
                  </p>
                </div>
              </Link>
            </div>
          )
        })}
      </div>
      <Link href={"/create-habit"}>
        <button className=" bg-amber-500 text-white text-3xl flex items-center justify-center rounded-full w-12 h-12">
          +
        </button>
      </Link>
    </div>
  )
}
