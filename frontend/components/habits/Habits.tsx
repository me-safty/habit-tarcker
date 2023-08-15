"use client"
import { Habit } from "@/types"
import Link from "next/link"
import Image from "next/image"
import menu from "@/public/menu.svg"
import boxes from "@/public/view-tile.svg"
import add from "@/public/add.svg"
import MiniCalender from "./MiniCalender"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import { setExpandView, setHabits } from "@/store/habitsSlice"
import DoneHabitsBox from "./DoneHabitsBox"
import HabitsBox from "./HabitsBox"
import { useEffect } from "react"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function Habits({ habitsData }: { habitsData: Habit[] }) {
  const dispatch = useAppDispatch()
  const expandView = useAppSelector((state) => state.habits.expandView)
  const habits = useAppSelector((state) => state.habits.allHabits)

  useEffect(() => {
    dispatch(setHabits(habitsData))
  }, [habitsData, dispatch])

  return (
    <div className="my-3 w-[330px] max-w-[400px]">
      <MiniCalender />
      <div className="flex gap-2">
        <button
          aria-label="expand-the-habits"
          className="my-2 p-[10px] rounded-lg bg-[color:var(--secondaryColor)] outline-none"
          onClick={() => dispatch(setExpandView(!expandView))}
        >
          {expandView ? (
            <Image src={boxes} height={20} width={20} alt="boxes view" />
          ) : (
            <Image src={menu} height={20} width={20} alt="expanded view" />
          )}
        </button>
        <Link
          href={"/create-habit"}
          className="w-fit inline-block outline-none"
        >
          <button
            aria-label="add-habit"
            className="bg-[color:var(--secondaryColor)] p-[10px] my-2 rounded-lg"
          >
            <Image src={add} height={20} width={20} alt="add habit" />
          </button>
        </Link>
      </div>
      <DoneHabitsBox />
      <HabitsBox habits={habits} expandView={expandView} />
    </div>
  )
}
