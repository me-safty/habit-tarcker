"use client"
import { Habit } from "@/types"
import Calender from "./Calender"
import calcStreak from "@/lib/calcStreak"
import { useEffect, useRef, useState } from "react"
import getCurrentDate from "@/lib/getCurrentDate"
import Image from "next/image"
import dots from "@/public/navigation-more.svg"
import { deleteHabit, editHabit } from "@/lib/serverActions"
import { useRouter } from "next/navigation"
import arrowBack from "@/public/arrow_back.svg"
import Link from "next/link"
import bin from "@/public/trash.svg"
import edit from "@/public/edit.svg"
import HabitForm from "./HabitForm"

interface TaskPageProps {
  habitData: Habit
}

export default function TaskPage({ habitData }: TaskPageProps) {
  const currentDate = getCurrentDate()

  const [habit, setHabit] = useState<Habit>(habitData)
  const popup = useRef<HTMLDivElement>(null)
  const editPopup = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popup.current && !popup.current.contains(e.target as Node)) {
        setShowPopup(false)
      } else if (
        editPopup.current &&
        !editPopup.current.contains(e.target as Node)
      ) {
        setShowEditPopup(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [popup])

  console.log(popup.current)
  return (
    <div className="container w-fit flex flex-col items-center justify-center relative">
      {showEditPopup && (
        <div
          ref={editPopup}
          style={{ boxShadow: "1px 1px 100vh 100vh #00000066" }}
          className="absolute top-[50%] left-[50%] backdrop:blur-md -translate-x-[50%] -translate-y-[50%] w-[300px] p-3 bg-[#00000041] rounded-xl"
        >
          <HabitForm
            actionFunction={(e) => {
              editHabit(e)
              setShowEditPopup(false)
            }}
            habit={habit}
            inputValue={habit.name}
          />
        </div>
      )}
      <div className="w-[315px] flex items-center mt-3 text-lg font-semibold rounded-lg text-white">
        <Link
          href={"/"}
          className="hover:bg-[#333] me-2 cursor-pointer transition bg-opacity-30 p-2 rounded-full"
        >
          <Image
            src={arrowBack}
            width={20}
            height={20}
            alt="image"
            className="invert scale-[1.10]"
          />
        </Link>
        <p className="flex-1">{habit.name}</p>
        <div
          onClick={() => setShowPopup(true)}
          className="hover:bg-[#333] cursor-pointer transition bg-opacity-30 p-2 rounded-full"
        >
          <Image
            src={dots}
            width={20}
            height={20}
            alt="image"
            className=" rotate-90 invert"
          />
        </div>
        {showPopup && (
          <div
            ref={popup}
            className="absolute m-4 top-0 font-normal text-base w-[130px] overflow-hidden right-0 items-start flex flex-col rounded bg-[#313131]"
          >
            <button
              onClick={() => {
                setShowEditPopup(true)
                setShowPopup(false)
              }}
              className="flex px-3 py-2 gap-2 hover:bg-[#ffffff0e] transition w-full"
            >
              <Image
                src={edit}
                alt="edit"
                width={18}
                height={18}
                className="invert opacity-60"
              />
              <p>edit</p>
            </button>
            <button
              onClick={() => {
                deleteHabit(habit._id)
                router.replace("/")
              }}
              className="flex px-3 py-2 gap-2 hover:bg-[#ffffff0e] transition w-full"
            >
              <Image
                src={bin}
                alt="bin"
                width={18}
                height={18}
                className="invert opacity-60"
              />
              <p>delete</p>
            </button>
          </div>
        )}
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
