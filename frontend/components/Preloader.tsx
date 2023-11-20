"use client"

import { useRef } from "react"
import { store } from "@/store"
import { Category, Habit } from "@/types"
import { setCategories, setDoneHabits, setHabits } from "@/store/habitsSlice"

export default function Preloader({
  habits,
  categories,
  doneHabits,
}: {
  habits: Habit[]
  categories: Category[]
  doneHabits: number
}) {
  const loaded = useRef(false)
  if (!loaded.current) {
    store.dispatch(setHabits(habits))
    store.dispatch(setDoneHabits(doneHabits))
    store.dispatch(setCategories(categories))
    loaded.current = true
  }
  return null
}
