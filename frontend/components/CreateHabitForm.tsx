"use client"
import { createHabit } from "@/lib/serverActions"
import { useRouter } from "next/navigation"

export default function CreateHabitForm() {
  const router = useRouter()
  return (
    <div className="container text-white">
      <form
        className="mt-4"
        action={(e) => {
          createHabit(e)
          router.replace("/")
        }}
      >
        <div className="bg-[#252525] p-3 rounded-xl">
          <p className="mb-3">Name</p>
          <input
            name="name"
            placeholder="Daily Check-in"
            type="text"
            className=" placeholder:text-[#7a7a7a] px-3 py-2 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]"
            required
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="font-semibold cursor-pointer text-[#eeeeee] w-full bg-amber-500 p-2 mt-3 rounded-lg"
        />
      </form>
    </div>
  )
}
