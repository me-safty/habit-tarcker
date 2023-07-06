export interface Task {
  _id: string
  _createdAt: string
  name: string
  bestStreak: number
  currentStreak: number
  dates: TaskByDate[]
  slug: {
    current: string
  }
}
export interface TaskByDate {
  date: string
  _type: string
  _key: string
}
