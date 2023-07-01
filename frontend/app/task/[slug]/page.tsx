import Calender from "@/components/Calender"
import calcStreak from "@/lib/calcStreak"
import { Task } from "@/typing"

interface TaskPagProps {
  params: { slug: string }
}

const task: Task = {
  name: "brush",
  bestStreak: 10,
  dates: [
    {
      date: "7/1/2023",
    },
    {
      date: "7/2/2023",
    },
    {
      date: "3/6/2023",
    },
    {
      date: "6/7/2023",
    },
    {
      date: "6/5/2023",
    },
    {
      date: "6/6/2023",
    },
    {
      date: "6/27/2023",
    },
    {
      date: "6/28/2023",
    },
    {
      date: "6/29/2023",
    },
    {
      date: "6/30/2023",
    },
  ],
}

export default function page({ params }: TaskPagProps) {
  return (
    <div className="container flex flex-col items-center justify-center">
      <p>{params.slug}</p>
      <Calender dates={task.dates} />
      <p>completed: {task.dates.length}</p>
      <p>current streak: {calcStreak(task.dates)}</p>
      <p>best streak: {task.dates.length}</p>
    </div>
  )
}
