"use client"

import { Habit } from "@/types"
import { setDoneHabits, setHabits } from "@/store/habitsSlice"
import { useAppDispatch, useAppSelector } from "./Habits"
import { useEffect, useState, useTransition } from "react"
import Link from "next/link"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import { cn } from "@/lib/utils"
import getCurrentDate from "@/lib/getCurrentDate"
import { markHabit } from "@/lib/serverActions"
import markHabitDone from "@/lib/habit/markHabitDone"

export default function HabitBox({
	habit,
	expanded = true,
}: {
	habit: Habit
	expanded?: boolean
}) {
	const dispatch = useAppDispatch()
	const calenderDate = useAppSelector((state) => state.habits.calenderDate)
	const habits = useAppSelector((state) => state.habits.allHabits)
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

	return (
		<section
			className={cn(
				expanded ? "ps-1 pe-2" : "",
				isDone ? "opacity-80" : "opacity-100",
				"text-white rounded-lg bg-[color:var(--mainColor)] py-2 flex items-center justify-between"
			)}
		>
			<button
				aria-label="complete-the-habit"
				className={`w-5 h-5 mx-2 border border-[color:var(--checkColor)] rounded-full ${
					isDone ? "bg-[color:var(--checkColor)]" : ""
				}`}
				onClick={() => {
					if (
						habit.isGoogleTaskHabit === true &&
						currentDate === calenderDate
					) {
						alert("this is a google task")
					} else {
						setIsDone((p) => !p)
						markHabitDone(
							habit,
							isDone,
							(updatedHabits) => {
								dispatch(
									setHabits(
										habits.map((h) => (habit._id === h._id ? updatedHabits : h))
									)
								)
								setStreak(updatedHabits.currentStreak)
							},
							calenderDate
						)
						dispatch(setDoneHabits(isDone ? doneHabits - 1 : doneHabits + 1))
						startTransition(() => markHabit(habit, isCompleted, calenderDate))
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
							<p className="mr-[1px] flex items-center justify-center">
								{habit.isGoogleTaskHabit && (
									<span className="px-[8px] mx-1 text-[9px] bg-[#69696949] rounded-md">
										Google
									</span>
								)}
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
