// "use client"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit, TaskByDate } from "@/types"
import { createClient } from "next-sanity"
import { revalidatePath, revalidateTag } from "next/cache"
import Link from "next/link"
// import React, { useState } from "react"

interface TasksProps {
  habits: Habit[]
}

export default function Tasks({ habits }: TasksProps) {
  const currentDate = getCurrentDate()
  // const [habits, setHabits] = useState<Habit[]>(tasks)

  // async function markHabitDone(habit: Habit, isDone: boolean) {
  //   let newHabit: Habit = habit

  //   async function updateHabitToDB() {
  //     await fetch("/api/habit-done", {
  //       method: "PUT",
  //       body: JSON.stringify({
  //         _id: newHabit._id,
  //         name: newHabit.name,
  //         bestStreak: newHabit.bestStreak,
  //         currentStreak: newHabit.currentStreak,
  //         slug: newHabit.slug.current,
  //         dates: newHabit.dates,
  //       }),
  //     })
  //   }

  //   function getNewHabits(habits: Habit[], newDates: TaskByDate[]): Habit[] {
  //     return habits.map((currentHabit) => {
  //       if (currentHabit._id === habit._id) {
  //         newHabit = { ...currentHabit, dates: newDates }
  //         return newHabit
  //       } else {
  //         return currentHabit
  //       }
  //     })
  //   }

  //   if (isDone === false) {
  //     const newDates = habit.dates
  //     newDates.push({
  //       date: currentDate,
  //       _type: "dateOfHabit",
  //       _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
  //     })
  //     const newHabits = getNewHabits(habits, newDates)
  //     setHabits(newHabits)
  //     updateHabitToDB()
  //   } else {
  //     const newDates = habit.dates.filter((d) => d.date !== currentDate)
  //     const newHabits = getNewHabits(habits, newDates)
  //     setHabits(newHabits)
  //     updateHabitToDB()
  //   }
  // }
  console.log(habits)
  async function markHabit(e: FormData) {
    "use server"
    interface FormDate {
      habit: Habit
      isCompleted: boolean
      habits: Habit[]
    }

    const data: FormDate = JSON.parse(e.get("habit") as string)

    async function updateHabitToDB(updatedHabit: Habit) {
      try {
        await fetch(`${process.env.URL}/api/habit-done`, {
          method: "PUT",
          body: JSON.stringify({
            _id: updatedHabit._id,
            name: updatedHabit.name,
            bestStreak: updatedHabit.bestStreak,
            currentStreak: updatedHabit.currentStreak,
            slug: updatedHabit.slug.current,
            dates: updatedHabit.dates,
          }),
        })
        console.log("created ###########################")
      } catch (error) {
        console.log(error)
      }
      // revalidatePath("/")
    }

    if (data.isCompleted === false) {
      const newDates = data.habit.dates
      newDates.push({
        date: currentDate,
        _type: "dateOfHabit",
        _key: `${Math.random().toString(32).slice(2)}-${currentDate}`,
      })
      const updatedHabit: Habit = { ...data.habit, dates: newDates }
      console.log(updatedHabit)
      updateHabitToDB(updatedHabit)
    } else {
      const newDates = data.habit.dates.filter((d) => d.date !== currentDate)
      const updatedHabit: Habit = { ...data.habit, dates: newDates }
      console.log(updatedHabit)
      updateHabitToDB(updatedHabit)
    }
    setTimeout(() => {
      revalidateTag("habits")
      console.log(data.habits, "new habits")
    }, 3000)
  }

  return (
    <div className="my-3 max-w-[400px]">
      <div className="my-3 rounded-xl p-1 bg-[#202020]">
        {habits.map((habit, i) => {
          const isCompleted = checkTheTaskIfCompleted(habit.dates, currentDate)
          return (
            <div
              key={i}
              className="text-white my-1 p-2 flex items-center justify-between"
            >
              <form action={markHabit}>
                <input
                  type="hidden"
                  name="habit"
                  value={JSON.stringify({ habit, isCompleted, habits })}
                />
                <button
                  style={{
                    background: isCompleted ? "rgb(245, 158, 11)" : "",
                  }}
                  className="w-6 h-6 mx-3 me-4 border border-amber-500 rounded-full"
                  // onClick={() => markHabitDone(habit, isCompleted)}
                  type="submit"
                />
              </form>
              <Link
                href={{
                  pathname: `habits/${habit.slug.current}`,
                  query: { isDone: true },
                }}
                prefetch={false}
                className="flex-1"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg">{habit.name}</p>
                  <p className="flex flex-col text-sm items-end">
                    {habit.currentStreak}
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
