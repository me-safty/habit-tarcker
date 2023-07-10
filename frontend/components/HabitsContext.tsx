"use client"

import { Habit } from "@/types"
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react"

export const HabitsContext = createContext<{
  habitsC: Habit[]
  setHabitsC: Dispatch<SetStateAction<Habit[]>>
}>({
  habitsC: [],
  setHabitsC: () => null,
})

export default function HabitsContextProvider({
  children,
}: {
  children: ReactNode
}) {
  const [habitsC, setHabitsC] = useState<Habit[]>([])
  return (
    <HabitsContext.Provider value={{ habitsC, setHabitsC }}>
      {children}
    </HabitsContext.Provider>
  )
}
