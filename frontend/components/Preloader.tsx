"use client"

import { useRef } from "react"
import { store } from "@/store"
import { Habit } from "@/types"
import { setHabits } from "@/store/habitsSlice"

export default function Preloader({ habits }: { habits: Habit[] }) {
  const loaded = useRef(false)
  if (!loaded.current) {
    store.dispatch(setHabits(habits))
    loaded.current = true
  }
  return null
}
