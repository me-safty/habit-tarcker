"use client"

import { useRef } from "react"
import { store } from "@/store"
import { Habit } from "@/types"
import { setDoneHabits, setHabits } from "@/store/habitsSlice"

export default function Preloader({
  habits,
  doneHabits,
}: {
  habits: Habit[]
  doneHabits: number
}) {
  const loaded = useRef(false)
  if (!loaded.current) {
    store.dispatch(setHabits(habits))
    store.dispatch(setDoneHabits(doneHabits))
    loaded.current = true
  }
  return null
}
