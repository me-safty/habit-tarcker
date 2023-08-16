import { createSlice } from "@reduxjs/toolkit"
import type { PayloadAction } from "@reduxjs/toolkit"

import { Habit } from "@/types"
import getCurrentDate from "@/lib/getCurrentDate"

export interface HabitsState {
  allHabits: Habit[]
  expandView: boolean
  doneHabits: number
  calenderDate: string
}

const initialState: HabitsState = {
  allHabits: [],
  expandView: false,
  doneHabits: 0,
  calenderDate: getCurrentDate(),
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
    setDoneHabits: (state, action: PayloadAction<number>) => {
      state.doneHabits = action.payload
    },
    setCalenderDate: (state, action: PayloadAction<string>) => {
      state.calenderDate = action.payload
    },
  },
})

export const { setHabits, setExpandView, setDoneHabits, setCalenderDate } =
  habitsSlice.actions
export default habitsSlice.reducer
