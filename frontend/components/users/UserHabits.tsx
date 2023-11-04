import checkTheTaskIfCompleted from "@/lib/checkTheTaskIfCompleted"
import getCurrentDate from "@/lib/getCurrentDate"
import { Habit } from "@/types"
import { Fragment, useMemo } from "react"

export default function UserHabits({ habits }: { habits: Habit[] }) {
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
    <section className="overflow-hidden mb-20 w-[330px] max-w-[400px]">
      {categoriesWithHabits
        .filter((category) => category.habits.length > 0)
        .map((category) => (
          <div
            key={category._id}
            className=" p-2 bg-[color:var(--secondaryColor)] mb-2 rounded-xl"
          >
            <p className="text-white px-3 py-1 bg-[color:var(--mainColor)] mb-2 w-fit rounded-md">
              {category.name}
            </p>
            <div className="w-full h-[2px] bg-[color:var(--mainColor)] my-2 rounded-full"></div>
            <div className="flex flex-col gap-2">
              {category.habits.map((habit) => {
                const isDone = checkTheTaskIfCompleted(
                  habit.dates,
                  getCurrentDate()
                )
                return (
                  <Fragment key={habit._id}>
                    <section
                      className={`${
                        isDone ? "opacity-80" : "opacity-100"
                      } text-white rounded-lg ps-1 pe-2 bg-[color:var(--mainColor)] py-2 flex items-center justify-between`}
                    >
                      <div
                        className={`w-5 h-5 mx-2 border border-[color:var(--checkColor)] rounded-full ${
                          isDone ? "bg-[color:var(--checkColor)]" : ""
                        }`}
                      ></div>
                      <div className="flex flex-1 justify-between items-center overflow-hidden">
                        <p
                          className="text-lg"
                          style={{
                            // height: "calc(1 * 1rem * 1.25)",
                            display: "-webkit-box",
                            WebkitBoxOrient: "vertical",
                            WebkitLineClamp: "1",
                          }}
                        >
                          {habit.name}
                        </p>
                        <p className="flex flex-col text-sm items-end">
                          {habit.currentStreak}
                          <span className="text-sm text-[#999999]">
                            current streak
                          </span>
                        </p>
                      </div>
                    </section>
                  </Fragment>
                )
              })}
            </div>
          </div>
        ))}
    </section>
  )
}
