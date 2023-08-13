"use client"
import { Habit } from "@/types"
import Link from "next/link"
import HabitBox from "./HabitBox"
import { useEffect, useMemo } from "react"
import Image from "next/image"
import menu from "@/public/menu.svg"
import boxes from "@/public/view-tile.svg"
import add from "@/public/add.svg"
import MiniCalender from "./MiniCalender"
import { AppDispatch, RootState } from "@/store"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"
import { setHabits, setExpandView } from "@/store/habitsSlice"
import DoneHabitsBox from "./DoneHabitsBox"

interface TasksProps {
  habitsData: Habit[]
}

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default function Tasks({ habitsData }: TasksProps) {
  // const [habits, setHabits] = useState<Habit[]>(habitsData)
  // const [expandedView, setExpandedView] = useState<boolean>(false)
  // const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all")

  const dispatch = useAppDispatch()
  const habits = useAppSelector((state) => state.habits.allHabits)
  const expandView = useAppSelector((state) => state.habits.expandView)

  useEffect(() => {
    // setHabits(habitsData)
    dispatch(setHabits(habitsData))
  }, [habitsData, dispatch])

  const categoriesWithHabits = useMemo(
    () =>
      habits[0]?.categories
        .map((category) => ({
          ...category,
          habits: habits.filter(
            (habit) => habit?.category?._id === category._id
          ),
        }))
        .reverse(),
    [habits]
  )

  return (
    <div className="my-3 w-[350px] max-w-[400px]">
      <MiniCalender />
      <div className="flex gap-2">
        <button
          className="my-2 p-[10px] rounded-lg bg-[color:var(--secondaryColor)] outline-none"
          onClick={() => dispatch(setExpandView(!expandView))}
        >
          {expandView ? (
            <Image src={boxes} height={20} width={20} alt="boxes view" />
          ) : (
            <Image src={menu} height={20} width={20} alt="expanded view" />
          )}
        </button>
        <Link
          href={"/create-habit"}
          className="w-fit inline-block outline-none"
        >
          <button className="bg-[color:var(--secondaryColor)] p-[10px] my-2 rounded-lg">
            <Image src={add} height={20} width={20} alt="add habit" />
          </button>
        </Link>
      </div>
      <DoneHabitsBox />
      <div className="overflow-hidden">
        {categoriesWithHabits.map((category) => (
          <div
            key={category._id}
            className="max-h-[78vh] p-2 bg-[color:var(--secondaryColor)] mb-2 rounded-xl"
          >
            <p className="text-white px-3 py-1 bg-[color:var(--mainColor)] mb-2 w-fit rounded-md">
              {category.name}
            </p>
            <div className="w-full h-[2px] bg-[color:var(--mainColor)] my-2 rounded-full"></div>
            <div
              className={`${
                expandView ? "flex flex-col gap-2" : "grid grid-cols-2 gap-2"
              }`}
            >
              {category.habits.map((habit) => (
                <HabitBox
                  habit={habit}
                  key={habit.slug.current}
                  expanded={expandView}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
