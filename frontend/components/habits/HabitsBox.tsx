"use client"
import { Category, Habit } from "@/types"
import HabitBox from "./HabitBox"
import { useMemo } from "react"
import { useAppSelector } from "./Habits"
import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"

export default function HabitsBox({
	habits,
	expandView,
	categories,
}: {
	habits: Habit[]
	expandView: boolean
	categories: Category[]
}) {
	const calenderDate = useAppSelector((state) => state.habits.calenderDate)

	const categoriesWithHabits = useMemo(
		() =>
			categories
				.map((category) => ({
					...category,
					habits: habits
						.filter(
							(habit) =>
								habit?.category?._id === category._id &&
								new Date(calenderDate).getTime() + 86400000 > // 86400000 = one day by ms
									new Date(habit._createdAt).getTime()
						)
						.sort(
							(a, b) =>
								+checkTheTaskIfCompleted(a.dates, calenderDate) -
								+checkTheTaskIfCompleted(b.dates, calenderDate)
						),
				}))
				.reverse(),
		[calenderDate, categories, habits]
	)
	return (
		<section className="overflow-hidden mb-20">
			{categoriesWithHabits
				.filter((category) => category.habits.length > 0)
				.map((category) => (
					<div
						key={category._id}
						className="p-2 bg-[color:var(--secondaryColor)] mb-2 rounded-xl"
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
		</section>
	)
}
