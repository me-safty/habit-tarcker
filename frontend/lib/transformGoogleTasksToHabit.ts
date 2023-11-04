import { Category, GoogleHabit, Habit, TaskByDate, User } from "@/types"
// import getCurrentDate from "./getCurrentDate"

interface GoogleHabitWithDates extends GoogleHabit {
  dates?: TaskByDate[]
  slug?: string
  createdAt?: string
}
export default function transformGoogleTasksToHabits(
  tasks: GoogleHabitWithDates[],
  user: User,
  categories: Category[]
): Habit[] {
  return tasks?.map((task) => ({
    _id: task.id,
    _createdAt: task.createdAt ? task.createdAt : task.due,
    name: task.title,
    bestStreak: 0,
    currentStreak: 0,
    dates: task?.dates ? task?.dates : [],
    slug: {
      current: task?.slug ? task?.slug : Date.now().toString(),
    },
    category: {
      _id: "c2d1e476-9499-4dfc-b961-ed7fad2fac58",
      _rev: "UI5KGa02sbnep2oeWLfB1p",
      _type: "category",
      name: "google",
    },
    categories,
    user,
  }))
}
