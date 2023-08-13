export interface Habit {
  _id: string
  _createdAt: string
  name: string
  bestStreak: number
  currentStreak: number
  dates: TaskByDate[]
  slug: {
    current: string
  }
  category: Category
  categories: Category[]
}
export interface Category {
  _rev?: string // = the id of the habit
  _type?: "category"
  name: string
  _id: string // = the _ref of the category
}
export interface TaskByDate {
  date: string
  _type: string
  _key: string
}

export interface User {
  _id: string
  name: string
  email: string
  image: string
  imglink: string
  habits: Habit[]
  slug: {
    current: string
  }
}
