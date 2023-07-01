export interface Task {
  name: string
  bestStreak: number
  dates: TaskByDate[]
}
export interface TaskByDate {
  date: string
}
