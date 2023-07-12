import { Habit } from "@/types"
import Link from "next/link"
import HabitBox from "./HabitBox"

interface TasksProps {
  habits: Habit[]
}

export default function Tasks({ habits }: TasksProps) {
  return (
    <div className="my-3 max-w-[400px]">
      <div className="my-3 rounded-xl p-1 bg-[#202020]">
        {habits.map((habit) => (
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
