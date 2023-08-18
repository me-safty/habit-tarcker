import { TaskByDate } from "@/types"
import getCurrentDate from "./getCurrentDate"

// A function that takes an array of dates as a parameter and returns the number of consecutive days in the array
export default function calcStreak(dates: TaskByDate[]): number {
  if (dates.length > 0) {
    // Create a new Date object for today
    const yesterday = new Date(getCurrentDate())
    // Get the day of the month (1-31)
    // const day = yesterday.getDate()
    // // Set the day to one less than the current day
    // yesterday.setDate(day - 1)

    // Initialize the streak to zero
    let streak = 0
    // Convert the dates to Date objects and sort them in ascending order
    let dateObjects = dates
      .map((date) => new Date(date.date))
      .sort((a, b) => a.getTime() - b.getTime())
    // Loop through the date objects from the end
    for (let i = dateObjects.length - 1; i > 0; i--) {
      let differenceBetweenCurrentDay =
        (yesterday.getTime() - dateObjects.at(-1)!.getTime()) /
        (1000 * 60 * 60 * 24)

      // Get the difference in days between the current date and the previous date
      if (differenceBetweenCurrentDay <= 1) {
        let diff =
          (dateObjects[i].getTime() - dateObjects[i - 1].getTime()) /
          (1000 * 60 * 60 * 24)
        // If the difference is one, increment the streak
        if (diff === 1) {
          streak++
        } else {
          // Otherwise, break the loop
          break
        }
      } else {
        streak = -1
        break
      }
    }
    // Return the streak plus one (to include the last date)
    return streak + 1
  } else {
    return 0
  }
}
