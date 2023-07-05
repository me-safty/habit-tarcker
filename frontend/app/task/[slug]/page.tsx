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
      date: "11/28/2022",
    },
    {
      date: "11/29/2022",
    },
    {
      date: "11/30/2022",
    },
    {
      date: "11/25/2022",
    },
    {
      date: "6/29/2023",
    },
    {
      date: "6/30/2023",
    },
    {
      date: "7/1/2023",
    },
    {
      date: "7/2/2023",
    },
    {
      date: "7/3/2023",
    },
    {
      date: "7/4/2023",
    },
    // {
    //   date: "7/5/2023",
    // },
  ],
}

export default function page({ params }: TaskPagProps) {
  return <TaskPage task={task}  />
}
