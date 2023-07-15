import { Habit } from "@/types"
import Link from "next/link"
import HabitBox from "./HabitBox"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"

interface TasksProps {
  habits: Habit[]
}

export default function Tasks({ habits }: TasksProps) {
  const currentDate = getCurrentDate()
  const sortedHabitByCompetition = habits.sort(
    (a, b) =>
      +checkTheTaskIfCompleted(a.dates, currentDate) -
      +checkTheTaskIfCompleted(b.dates, currentDate)
  )
  return (
    <div className="my-3 w-[350px] max-w-[400px]">
      <div className="my-3 rounded-xl p-1 bg-[#202020]">
        {sortedHabitByCompetition.map((habit) => (
          <HabitBox habit={habit} key={habit.slug.current} />
        ))}
      </div>
      <Link href={"/create-habit"}>
        <button className=" bg-amber-500 text-white text-3xl flex items-center justify-center rounded-full w-12 h-12">
          +
        </button>
      </Link>
    </div>
  )
}
