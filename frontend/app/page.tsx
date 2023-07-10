import Habits from "@/components/Habits"
import { store } from "@/store"
import { setStartupHabits } from "@/store/habitsSlice"
import { Habit } from "@/types"

async function getHabits() {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "habit"] {
    _id,
    _createdAt,
    name,
    currentStreak,
    bestStreak,
    dates,
    slug,
  }
`
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`,
    {
      method: "GET",
      cache: "no-store",
    }
  )
  const habits = await res.json()
  return habits.result
}

const habits: Habit[] = [
  {
    _id: "Grgr",
    _createdAt: "Ferfwer",
    name: "brush",
    bestStreak: 10,
    currentStreak: 0,
    slug: {
      current: "Efef",
    },
    dates: [
      // {
      //   date: "11/28/2022",
      // },
      // {
      //   date: "11/29/2022",
      // },
      // {
      //   date: "11/30/2022",
      // },
      // {
      //   date: "11/25/2022",
      // },
      // {
      //   date: "6/29/2023",
      // },
      // {
      //   date: "6/30/2023",
      // },
      // {
      //   date: "7/1/2023",
      // },
      // {
      //   date: "7/2/2023",
      // },
      // {
      //   date: "7/3/2023",
      // },
      // {
      //   date: "7/4/2023",
      // },
      // {
      //   date: "7/5/2023",
      // },
    ],
  },
]

export default async function Home() {
  const habits: Habit[] = await getHabits()
  store.dispatch(setStartupHabits(habits))
  console.log(store.getState().habits.startupHabits, "redux habits")
  return (
    <main className="container">
      <Habits tasks={store.getState().habits.startupHabits} />
    </main>
  )
}
