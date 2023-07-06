import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import { Task } from "@/typing"
import Link from "next/link"
import React from "react"

interface TasksProps {
  tasks: Task[]
}

export default function Tasks({ tasks }: TasksProps) {
  return (
    <div className="my-3 max-w-[400px]">
      <div className="my-3 rounded-xl p-1 bg-[#202020]">
        {tasks.map((task, i) => {
          const isCompleted = checkTheTaskIfCompleted(task.dates)
          return (
            <Link key={i} href={`task/${task.slug.current}`}>
              <div className="text-white my-1 p-2 flex items-center justify-between gap-5">
                <div className="flex gap-3 justify-center items-center">
                  <div
                    style={{
                      background: isCompleted ? "rgb(245, 158, 11)" : "",
                    }}
                    className="w-5 h-5 border border-amber-500 rounded-full"
                  />
                  <p className="text-lg">{task.name}</p>
                </div>
                <p className="flex flex-col text-sm items-end">
                  {task.currentStreak}
                  <span className="text-sm text-[#999999]">current streak</span>
                </p>
              </div>
            </Link>
          )
        })}
      </div>
      <Link href={"/create-habit"}>
        <button className=" bg-amber-500 text-white text-3xl flex items-center justify-center rounded-full w-12 h-12">
          +
        </button>
      </Link>
    </div>
  )
}
