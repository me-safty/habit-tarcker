export interface Habit {
  _id: string
  _createdAt: string
  _updatedAt?: string
  name: string
  bestStreak: number
  currentStreak: number
  dates: TaskByDate[]
  slug: {
    current: string
  }
  category: Category
  categories: Category[]
  user: User
  // isDeleted?: boolean
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
  id: string
  name: string
  email: string
  image: string
  imglink: string
  hashedPassword: string
  habits: Habit[]
  slug: {
    current: string
  }
}
export interface GoogleHabit {
  kind: string
  id: string
  etag: string
  title: string
  updated: string
  selfLink: string
  position: string
  status: "completed" | "needsAction"
  due: string
  completed?: string
  hidden?: boolean
  links?: string[]
}
export interface GoogleCategory {
  kind: string
  id: string
  etag: string
  title: string
  updated: string
  selfLink: string
}
export interface GoogleCategories {
  kind: string
  etag: string
  nextPageToken: string
  items: GoogleCategory[]
}
export interface GoogleHabits {
  kind: string
  etag: string
  nextPageToken: string
  items: GoogleHabit[]
}
