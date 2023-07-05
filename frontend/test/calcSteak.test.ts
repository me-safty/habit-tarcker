import calcStreak from "@/lib/calcStreak"
import { TaskByDate } from "@/typing"

describe("add", () => {
  const currentDate = ["7", "5", "2023"]

  it("calc the streak", () => {
    const dates: TaskByDate[] = [
      {
        date: "7/3/2023",
      },
      {
        date: "7/4/2023",
      },
      {
        date: "7/5/2023",
      },
    ]
    const streak = calcStreak(dates, currentDate)
    expect(streak).toEqual(3)
  })
  it("if the streak equal to 1 and it separated with big streak", () => {
    const dates: TaskByDate[] = [
      {
        date: "6/30/2023",
      },
      {
        date: "7/1/2023",
      },
      {
        date: "7/2/2023",
      },
      {
        date: "7/5/2023",
      },
    ]
    const streak = calcStreak(dates, currentDate)
    expect(streak).toEqual(0)
  })
  it("if the streak is separated with the current day more than one day ", () => {
    const dates: TaskByDate[] = [
      {
        date: "6/30/2023",
      },
      {
        date: "7/1/2023",
      },
      {
        date: "7/2/2023",
      },
      {
        date: "7/4/2023",
      },
      {
        date: "7/5/2023",
      },
    ]
    const streak = calcStreak(dates, currentDate)
    expect(streak).toEqual(2)
  })
  
  it("two days streak without the current day", () => {
    const dates: TaskByDate[] = [
      {
        date: "7/2/2023",
      },
      {
        date: "7/3/2023",
      },
      {
        date: "7/4/2023",
      },
    ]
    const streak = calcStreak(dates, currentDate)
    expect(streak).toEqual(3)
  })

  it("if the streak include days from the previous months", () => {
    const dates: TaskByDate[] = [
      {
        date: "6/29/2023",
      },
      {
        date: "6/30/2023",
      },
      {
        date: "7/1/2023",
      },
      {
        date: "7/2/2023",
      },
      {
        date: "7/3/2023",
      },
      {
        date: "7/4/2023",
      },
      {
        date: "7/5/2023",
      },
    ]
    const streak = calcStreak(dates, currentDate)
    expect(streak).toEqual(7)
  })
})
