import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { Habit } from "@/types"

export interface HabitsState {
  allHabits: Habit[]
  expandView: boolean
}

const initialState: HabitsState = {
  allHabits: [],
  expandView: false,
}

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.allHabits = action.payload
    },
    setExpandView: (state, action: PayloadAction<boolean>) => {
      state.expandView = action.payload
    },
  },
})

export const { setHabits, setExpandView } = habitsSlice.actions
export default habitsSlice.reducer
