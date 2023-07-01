import Tasks from "@/components/Tasks"
import { Task } from "@/typing"

const tasks: Task[] = [
  {
    name: "brush",
    bestStreak: 10,
    dates: [
      {
        date: "7/2/2023",
      },
      {
        date: "7/1/2023",
      },
      {
        date: "8/6/2023",
      },
      {
        date: "9/6/2023",
      },
    ],
  },
  {
    name: "play",
    bestStreak: 10,
    dates: [
      {
        date: "7/6/2023",
      },
      {
        date: "7/1/2023",
      },
      {
        date: "9/6/2023",
      },
    ],
  },
  {
    name: "salah",
    bestStreak: 10,
    dates: [
      {
        date: "7/6/2023",
      },
      {
        date: "8/6/2023",
      },
      {
        date: "9/6/2023",
      },
    ],
  },
]

export default function Home() {
  return (
    <main className="container">
      {/* @ts-ignore */}
      <Tasks tasks={tasks} />
    </main>
  )
}
