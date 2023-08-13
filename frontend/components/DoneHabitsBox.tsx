"use client"

import doneImage from "@/public/done-img.svg"
import blobs from "@/public/layered-steps-haikei.svg"
import Image from "next/image"
import { useAppSelector } from "./Habits"

export default function DoneHabitsBox() {
  const habits = useAppSelector((state) => state.habits.allHabits)
  const doneHabits = useAppSelector((state) => state.habits.doneHabits)

  return (
    <div className="text-white relative flex bg-[color:var(--secondaryColor)] p-3 rounded-lg mb-2">
      <div className="absolute w-full h-[150px] overflow-hidden top-0 left-0 rounded-xl">
        <Image
          className="-translate-y-1"
          src={blobs}
          height={130}
          width={350}
          alt="done"
        />
      </div>
      <div className="flex-1 flex flex-col relative justify-center items-center">
        <p className="">You almost Done!</p>
        <p className="">
          <span className="">{doneHabits}</span>/
          <span className="">{habits.length}</span>
        </p>
      </div>
      <div className="mr-3 relatives">
        <Image
          className="relative"
          src={doneImage}
          height={120}
          width={120}
          alt="done"
        />
      </div>
    </div>
  )
}
