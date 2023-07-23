import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { Habit } from "@/types"

export interface habitsState {
  startupHabits: Habit[]
}

const initialState: habitsState = {
  startupHabits: [],
}

const habitsSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    setStartupHabits: (state, action: PayloadAction<Habit[]>) => {
      state.startupHabits = action.payload
    },
  },
})

export const { setStartupHabits } = habitsSlice.actions
export default habitsSlice.reducer
