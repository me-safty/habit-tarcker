"use client"
import { Habit } from "@/types"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface HabitFormProps {
  actionFunction: (e: FormData) => Promise<void> | void
  redirectPageLink?: string
  habit?: Habit
  inputValue?: string
}

export default function HabitForm({
  actionFunction,
  redirectPageLink,
  habit,
  inputValue,
}: HabitFormProps) {
  const router = useRouter()
  const [input, setInput] = useState<string | undefined>(inputValue)
  return (
    <form
      action={(e) => {
        actionFunction(e)
        if (redirectPageLink) {
          router.replace(redirectPageLink)
        }
      }}
    >
      <input type="hidden" name="habit" value={JSON.stringify(habit)} />
      <div className="bg-[#252525] p-3 rounded-xl">
        <p className="mb-3 text-white">Name</p>
        <input
          name="name"
          placeholder="Daily Check-in"
          type="text"
          className=" placeholder:text-[#7a7a7a] text-white px-3 py-2 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]"
          required
          onChange={(e) => setInput(e.target.value)}
          value={input ? input : ""}
        />
      </div>
      <input
        type="submit"
        value="Submit"
        className="font-semibold cursor-pointer text-[#eeeeee] w-full bg-amber-500 p-2 mt-3 rounded-lg"
      />
    </form>
  )
}
