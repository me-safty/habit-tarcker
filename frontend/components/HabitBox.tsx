import markHabit from "@/lib/serverActions"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit } from "@/types"
import Link from "next/link"

export default function HabitBox({ habit }: { habit: Habit }) {
  const currentDate = getCurrentDate()
  const isCompleted = checkTheTaskIfCompleted(habit.dates, currentDate)
  return (
    <form
      className="text-white my-1 p-2 flex items-center justify-between"
      action={markHabit}
    >
      <input
        type="hidden"
        name="habit"
        value={JSON.stringify({ habit, isCompleted })}
      />
      <button
        style={{
          background: isCompleted ? "rgb(245, 158, 11)" : "",
        }}
        className="w-6 h-6 mx-3 me-4 border border-amber-500 rounded-full"
        type="submit"
      />
      <Link href={`habits/${habit.slug.current}`} className="flex-1">
        <div className="flex justify-between items-center">
          <p className="text-lg">{habit.name}</p>
          <p className="flex flex-col text-sm items-end">
            {habit.currentStreak}
            <span className="text-sm text-[#999999]">current streak</span>
          </p>
        </div>
      </Link>
    </form>
  )
}
