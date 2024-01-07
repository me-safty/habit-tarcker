"use client"
import { markHabit } from "@/lib/serverActions"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit, TaskByDate } from "@/types"
import Link from "next/link"
import { useEffect, useMemo, useState, useTransition } from "react"
import calcStreak from "@/lib/calcStreak"
import { useAppDispatch, useAppSelector } from "./Habits"
import { setDoneHabits } from "@/store/habitsSlice"
import { cn } from "@/lib/utils"
import newDateObject from "@/lib/habit/newDateObject"

export default function HabitBox({
	habit,
	expanded = true,
}: {
	habit: Habit
	expanded?: boolean
}) {
	const dispatch = useAppDispatch()
	const calenderDate = useAppSelector((state) => state.habits.calenderDate)
	let doneHabits = useAppSelector((state) => state.habits.doneHabits)

	const [isPending, startTransition] = useTransition()
	const currentDate = getCurrentDate()
	const isCompleted = checkTheTaskIfCompleted(habit.dates, calenderDate)
	const [isDone, setIsDone] = useState<boolean>(isCompleted)
	const [streak, setStreak] = useState<number>(habit.currentStreak)

	useEffect(() => {
		const isCompleted = checkTheTaskIfCompleted(habit.dates, calenderDate)
		setIsDone(isCompleted)
		if (calenderDate === currentDate) {
			setStreak(habit.currentStreak)
		}
	}, [habit, calenderDate, currentDate])

	const cashedStreak = useMemo(() => {
		function calcExpectedNewDates(dates: TaskByDate[]): TaskByDate[] {
			//spared the array to make a new array without the reference to the old one
			if (isCompleted === false) {
				const newDates = [...dates]
				newDates.push(newDateObject(calenderDate))
				return newDates
			} else {
				return dates.filter((d) => d.date !== calenderDate)
			}
		}
		return calcStreak(calcExpectedNewDates(habit.dates))
	}, [habit.dates, calenderDate, isCompleted])
	return (
		<section
			className={`${expanded ? "ps-1 pe-2" : ""} ${
				isDone ? "opacity-80" : "opacity-100"
			} text-white rounded-lg bg-[color:var(--mainColor)] py-2 flex items-center justify-between`}
		>
			<button
				aria-label="complete-the-habit"
				className={`w-5 h-5 mx-2 border border-[color:var(--checkColor)] rounded-full ${
					isDone ? "bg-[color:var(--checkColor)]" : ""
				}`}
				onClick={() => {
					if (habit.isGoogleTaskHabit !== true) {
						setIsDone((p) => !p)
						setStreak(cashedStreak)
						dispatch(setDoneHabits(isDone ? doneHabits - 1 : doneHabits + 1))
						startTransition(() =>
							markHabit({ habit, isCompleted }, calenderDate)
						)
					} else {
						alert("this is a google task")
					}
				}}
				type="submit"
				disabled={isPending}
			/>
			<Link href={`habits/${habit.slug.current}`} className="flex-1">
				<div className="flex items-center justify-between overflow-hidden">
					<p
						className={`${
							expanded ? "text-lg" : "text-[15px]"
						} overflow-hidden`}
						style={{
							// height: "calc(1 * 1rem * 1.25)",
							display: "-webkit-box",
							WebkitBoxOrient: "vertical",
							WebkitLineClamp: "1",
						}}
					>
						{habit.name}
					</p>
					{expanded && (
						<div className="flex flex-col items-end text-sm">
							<p className="mr-[1px]">
								<span
									className={cn(
										"w-full inline-block text-center font-semibold",
										+streak === 0 && "text-red-400"
									)}
								>
									{streak}
								</span>
							</p>
							<span className="text-[#999999] text-sm whitespace-nowrap">
								current streak
							</span>
						</div>
					)}
				</div>
			</Link>
		</section>
	)
}
