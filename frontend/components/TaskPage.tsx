import { Task } from "@/typing"
import Calender from "./Calender"
import calcStreak from "@/lib/calcStreak"

interface TaskPageProps {
  task: Task

}
export default function TaskPage({ task }: TaskPageProps) {
  return (
    <div className="container flex flex-col items-center justify-center">
      <Calender dates={task.dates} />
      <div className="grid grid-cols-2 gap-3 bg-[#202020] w-[315px] rounded-xl p-3">
        <div className="p-3 bg-[#363636] bg-opacity-40 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Total completion</p>
          <p className="font-bold text-xl">
            {task.dates.length} <span className="text-sm">Count</span>
          </p>
        </div>
        <div className="p-3 bg-[#363636] bg-opacity-50 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Current Streak</p>
          <p className="font-bold text-xl">
            {calcStreak(task.dates)} <span className="text-sm">Days</span>
          </p>
        </div>
        <div className="p-3 bg-[#363636] bg-opacity-50 rounded-lg text-white">
          <p className="text-sm text-[#999999]">Best Streak</p>
          <p className="font-bold text-xl">
            {calcStreak(task.dates)} <span className="text-sm">Days</span>
          </p>
        </div>
      </div>
    </div>
  )
}
