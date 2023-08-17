"use client"
import { Habit } from "@/types"
import MiniCalender from "./MiniCalender"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import { setHabits } from "@/store/habitsSlice"
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
      <DoneHabitsBox />
      <HabitsBox habits={habits} expandView={expandView} />
    </div>
  )
}
