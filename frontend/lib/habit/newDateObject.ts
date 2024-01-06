import { TaskByDate } from "@/types"

export default function newDateObject(date: string): TaskByDate {
	return {
		date,
		_type: "dateOfHabit",
		_key: `${Math.random().toString(32).slice(2)}-${date}`,
	}
}
