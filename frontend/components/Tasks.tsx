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
          <Link key={i} href={`task/${task.slug.current}`}>
            <div className="text-white border border-white rounded-xl my-3 p-3 flex items-center justify-between gap-5">
              <p>{task.name}</p>
              <p>total Days: {task.dates.length}</p>
              <div
                style={{
                  background: isCompleted ? "white" : "",
                }}
                className="w-4 h-4 border border-white rounded-full"
              ></div>
            </div>
          </Link>
        )
      })}
      <Link href={"/create-habit"}>
        <button className=" bg-amber-500 text-white text-2xl flex items-center justify-center rounded-full w-10 h-10">
          +
        </button>
      </Link>
    </div>
  )
}
