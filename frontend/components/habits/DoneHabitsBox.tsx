"use client"

import doneImage from "@/public/done-img.svg"
import blobs from "@/public/layered-steps-haikei.svg"
import Image from "next/image"
import { useAppSelector } from "./Habits"
import calcHabitsCount from "@/lib/calcHabitsCount"

export default function DoneHabitsBox() {
	const habits = useAppSelector((state) => state.habits.allHabits)
	const doneHabits = useAppSelector((state) => state.habits.doneHabits)
	const calenderDate = useAppSelector((state) => state.habits.calenderDate)
	const habitsCount = calcHabitsCount(habits, calenderDate)

	const doneHabitsPresent = ((doneHabits / habitsCount) * 100).toFixed()

	return (
		<section className="text-white relative flex bg-[color:var(--secondaryColor)] p-3 rounded-lg mb-2">
			<div className="absolute w-full h-[150px] overflow-hidden top-0 left-0 rounded-xl">
				<Image
					className="-translate-y-1"
					src={blobs}
					height={130}
					width={350}
					alt="done"
					quality={45}
					priority
				/>
			</div>
			<div className="mb-4 flex-1 flex flex-col relative justify-center items-center">
				<p className="">You almost Done!</p>
				<div className="w-32 h-1 my-1 relative bg-[#3d3d3d] rounded-lg">
					<span
						className="rounded-lg absolute h-1 bg-[color:var(--checkColor)]"
						style={{
							width: `${doneHabitsPresent}%`,
							transition: ".4s",
						}}
					></span>
				</div>
				<p className="">
					<span className="">{doneHabits}</span>/
					<span className="">{habitsCount}</span>
					<span className="ml-2">{doneHabitsPresent}%</span>
				</p>
			</div>
			<div className="mr-3 relatives">
				<Image
					className="relative"
					src={doneImage}
					height={120}
					width={120}
					alt="done"
					quality={45}
				/>
			</div>
		</section>
	)
}
