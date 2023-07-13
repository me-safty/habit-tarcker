"use client"
import { Habit } from "@/types"
import Calender from "./Calender"
import calcStreak from "@/lib/calcStreak"
import { useState } from "react"
import getCurrentDate from "@/lib/getCurrentDate"
import Image from "next/image"
import dots from "@/public/navigation-more.svg"
import { deleteHabit } from "@/lib/serverActions"
import { useRouter } from "next/navigation"

interface TaskPageProps {
  habitData: Habit
}

export default function TaskPage({ habitData }: TaskPageProps) {
  const currentDate = getCurrentDate()

  const [habit, setHabit] = useState<Habit>(habitData)
  const router = useRouter()

  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="bg-[#202020] relative flex items-center mt-3 w-full text-lg font-semibold text-center rounded-lg p-2 text-white">
        <p className="flex-1">{habit.name}</p>
        <div className="hover:bg-[#333] transition bg-opacity-30 p-2 rounded-full">
          <Image
            src={dots}
            width={20}
            height={20}
            alt="Picture of the author"
            className=" rotate-90 invert"
          />
        </div>
        <div className="absolute top-0 right-0 flex flex-col gap-2 p-1 rounded bg-[#313131]">
          <button className="px-2">edit</button>
          <button
            className="px-2"
            onClick={() => {
              deleteHabit(habit._id)
              router.replace("/")
            }}
          >
            delete
          </button>
        </div>
      </div>
      <Calender dates={habit.dates} />
      <div className="grid grid-cols-2 gap-3 bg-[#202020] w-[315px] rounded-xl p-3">
        <div className="p-3 bg-[#363636] bg-opacity-40 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Total completion</p>
          <p className="font-bold text-xl">
            {habit.dates.length} <span className="text-sm">Count</span>
          </p>
        </div>
        <div className="p-3 bg-[#363636] bg-opacity-50 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Current Streak</p>
          <p className="font-bold text-xl">
            {calcStreak(habit.dates, currentDate.split("/"))}{" "}
            <span className="text-sm">Days</span>
          </p>
        </div>
        <div className="p-3 bg-[#363636] bg-opacity-50 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Best Streak</p>
          <p className="font-bold text-xl">
            {habit.bestStreak} <span className="text-sm">Days</span>
          </p>
        </div>
      </div>
    </div>
  )
}
