import { Category, GoogleHabit, Habit, TaskByDate, User } from "@/types"
// import getCurrentDate from "./getCurrentDate"

interface GoogleHabitWithDates extends GoogleHabit {
  dates?: TaskByDate[]
}
export default function transformGoogleTaskToHabit(
  task: GoogleHabitWithDates,
  user: User,
  categories: Category[]
): Habit {
  return {
    _id: task.id,
    _createdAt: task.due,
    name: task.title,
    bestStreak: 0,
    currentStreak: 0,
    dates: task?.dates ? task?.dates : [],
    slug: {
      current: Date.now().toString(),
    },
    category: {
      _id: "c2d1e476-9499-4dfc-b961-ed7fad2fac58",
      _rev: "UI5KGa02sbnep2oeWLfB1p",
      _type: "category",
      name: "google",
    },
    categories,
    user,
  }
}
