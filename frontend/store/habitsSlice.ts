import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { Habit } from "@/types"

export interface habitsState {
  habits: Habit[]
}

const initialState: habitsState = {
  habits: [],
}

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setHabits: (state, action: PayloadAction<Habit[]>) => {
      state.habits = action.payload
    },
  },
})

export const { setHabits } = habitsSlice.actions
export default habitsSlice.reducer
