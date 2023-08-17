import { Habit } from "@/types"

export default function calcHabitsCount(
  habits: Habit[],
  calenderDate: string
): number {
  let habitsCount = 0
  habits.forEach((habit) => {
    if (
      new Date(calenderDate).getTime() + 86400000 > //  = one day by ms
      new Date(habit._createdAt).getTime()
    ) {
      habitsCount++
    }
  })
  return habitsCount
}
