import TaskPage from "@/components/TaskPage"
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
    // {
    //   date: "7/2/2023",
    // },
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
  return <TaskPage task={task} />
}
