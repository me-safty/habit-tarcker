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
      date: "7/3/2023",
    },
    {
      date: "7/4/2023",
    },
    {
      date: "7/5/2023",
    },
  ],
}

export default function page({ params }: TaskPagProps) {
  return <TaskPage task={task}  />
}
