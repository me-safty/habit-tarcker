"use client"
import { Category, Habit } from "@/types"
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
import CategorySelectBox from "./categorySelectBox"

interface TaskPageProps {
  habitData: Habit
}

export default function TaskPage({ habitData }: TaskPageProps) {
  const currentDate = getCurrentDate()
  const popup = useRef<HTMLDivElement>(null)
  const editPopup = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const [habit, setHabit] = useState<Habit>(habitData)
  const [showPopup, setShowPopup] = useState<boolean>(false)
  const [showEditPopup, setShowEditPopup] = useState<boolean>(false)
  const [input, setInput] = useState<string>(habit.name)
  const [showOptionsBox, setShowOptionsBox] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    habit.category
  )

  useEffect(() => {
    setHabit(habitData)
  }, [habitData])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popup.current && !popup.current.contains(e.target as Node)) {
        setShowPopup(false)
      } else if (
        editPopup.current &&
        !editPopup.current.contains(e.target as Node)
      ) {
        setShowEditPopup(false)
        setShowOptionsBox(false)
        setInput(habit.name)
        setSelectedCategory(habit.category)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [popup, editPopup, habit])

  return (
    <div className="w-fit relative">
      {showEditPopup && (
        <div
          ref={editPopup}
          style={{
            boxShadow: "1px 1px 100vh 100vh #00000066",
            backdropFilter: "blur(4px)",
          }}
          className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[300px] p-3 bg-[#333333] rounded-xl"
        >
          <div className="bg-[#252525] p-3 rounded-xl mb-3">
            <p className="mb-3 text-white">Name</p>
            <input
              name="name"
              placeholder="Daily Check-in"
              type="text"
              className=" placeholder:text-[#7a7a7a] text-white px-3 py-2 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]"
              required
              onChange={(e) => setInput(e.target.value)}
              value={input ? input : ""}
            />
          </div>
          <div className="bg-[#252525] p-3 rounded-xl">
            <p className="mb-3 text-white">Category</p>
            <CategorySelectBox
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categories={habit.categories}
              showOptionsBox={showOptionsBox}
              setShowOptionsBox={setShowOptionsBox}
            />
          </div>
          <button
            type="submit"
            onClick={() => {
              setHabit({ ...habit, name: input, category: selectedCategory })
              setShowEditPopup(false)
              editHabit({ ...habit, name: input, category: selectedCategory })
            }}
            className="font-semibold cursor-pointer text-[#eeeeee] w-full bg-amber-500 p-2 mt-3 rounded-lg"
          >
            edit
          </button>
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
            className="scale-[1.10]"
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
            className=" rotate-90"
          />
        </div>
        {showPopup && (
          <div
            ref={popup}
            className="absolute mt-3 top-0 font-normal text-base w-[130px] overflow-hidden right-0 items-start flex flex-col rounded bg-[#313131]"
          >
            <button
              onClick={() => {
                setShowEditPopup(true)
                setShowPopup(false)
              }}
              className="flex items-center px-3 py-2 gap-2 hover:bg-[#ffffff0e] transition w-full"
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
              className="flex items-center px-3 py-2 gap-2 hover:bg-[#ffffff0e] transition w-full"
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
