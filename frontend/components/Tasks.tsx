import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import { Task } from "@/typing"
import Link from "next/link"
import React from "react"

interface TasksProps {
  tasks: Task[]
}

export default function Tasks({ tasks }: TasksProps) {
  console.log(new Date().toLocaleString().split(",")[0] === "7/1/2023")

  return (
    <div className="p-3">
      {tasks.map((task, i) => {
        const isCompleted = checkTheTaskIfCompleted(task.dates)
        return (
          <Link key={i} href={`task/${task.name}`}>
            <div className="border border-black rounded-xl my-3 p-3 flex items-center justify-between gap-5">
              <p>{task.name}</p>
              <div
                style={{
                  background: isCompleted ? "black" : "",
                }}
                className="w-4 h-4 border border-black rounded-full"
              ></div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
