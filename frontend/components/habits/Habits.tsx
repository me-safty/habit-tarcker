"use client"
import { Category, Habit } from "@/types"
import MiniCalender from "./MiniCalender"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import { setCategories, setHabits } from "@/store/habitsSlice"
import DoneHabitsBox from "./DoneHabitsBox"
import HabitsBox from "./HabitsBox"
import { useEffect } from "react"

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function Habits({
  habitsData,
  categoriesData,
}: {
  habitsData: Habit[]
  categoriesData: Category[]
}) {
  const dispatch = useAppDispatch()
  const expandView = useAppSelector((state) => state.habits.expandView)
  const habits = useAppSelector((state) => state.habits.allHabits)
  const categories = useAppSelector((state) => state.habits.categories)

  useEffect(() => {
    dispatch(setHabits(habitsData))
    dispatch(setCategories(categoriesData))
  }, [habitsData, dispatch, categoriesData])

  return (
    <div className="my-3 w-[330px] max-w-[400px]">
      <MiniCalender />
      <DoneHabitsBox />
      <HabitsBox
        categories={categories}
        habits={habits}
        expandView={expandView}
      />
    </div>
  )
}
