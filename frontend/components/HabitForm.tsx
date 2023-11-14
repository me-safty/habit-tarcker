"use client"
import { Category, Habit } from "@/types"
import { redirect, useRouter } from "next/navigation"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import CategorySelectBox from "./categorySelectBox"
import { useAppSelector } from "./habits/Habits"

interface HabitFormProps {
  actionFunction: (e: FormData) => Promise<void> | void
  categories: Category[]
  redirectPageLink?: string
  habit?: Habit
  inputValue?: string
}

export default function HabitForm({
  actionFunction,
  categories,
  redirectPageLink,
  inputValue,
}: HabitFormProps) {
  const user = useAppSelector((state) => state.habits.allHabits[0]?.user)
  if (!user) {
    redirect("/")
  }
  const router = useRouter()
  const [input, setInput] = useState<string | undefined>(inputValue)
  const [showOptionsBox, setShowOptionsBox] = useState<boolean>(false)
  const [selectedCategory, setSelectedCategory] = useState<Category>()
  const [showError, setShowError] = useState<boolean>(false)
  useEffect(() => {
    if (selectedCategory !== undefined) {
      setShowError(false)
    }
  }, [selectedCategory])

  return (
    <form
      action={(e) => {
        if (selectedCategory) {
          actionFunction(e)
          if (redirectPageLink) {
            router.replace(redirectPageLink)
          }
        } else {
          setShowError(true)
        }
      }}
    >
      <input
        type="hidden"
        name="categoryId"
        value={selectedCategory && selectedCategory._id}
      />
      <input type="hidden" name="sessionId" value={user._id} />
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
      <div className="bg-[#252525] p-3 rounded-xl mt-3">
        <p className="mb-3 text-white">Category</p>
        <CategorySelectBox
          selectedCategory={selectedCategory as Category}
          setSelectedCategory={
            setSelectedCategory as Dispatch<SetStateAction<Category>>
          }
          showOptionsBox={showOptionsBox}
          setShowOptionsBox={setShowOptionsBox}
          categories={categories}
        />
        {showError && (
          <p className="m-2 mb-0 text-red-600">please select a category</p>
        )}
      </div>
      <input
        type="submit"
        value="Create a new Habit"
        className="font-semibold cursor-pointer text-[#eeeeee] w-full bg-amber-500 p-2 mt-3 rounded-lg"
      />
    </form>
  )
}
