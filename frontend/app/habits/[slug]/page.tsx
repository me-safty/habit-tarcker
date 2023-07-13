import HabitPage from "@/components/HabitPage"
import { Habit } from "@/types"

interface TaskPagProps {
  params: { slug: string }
}

const habit: Habit = {
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
}

async function getHabit(slug: string) {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `
  *[_type == "habit" && slug.current == $slug][0] {
    _id,
    _createdAt,
    name,
    bestStreak,
    currentStreak,
    dates,
    slug,
  }
  `
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
      query
    )}&$slug="${slug}"`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["habitPage"],
      },
    }
  )
  const habits = await res.json()
  return habits.result
}

export default async function page({ params }: TaskPagProps) {
  const habit: Habit = await getHabit(params.slug)
  console.log(habit, "fefd")
  return <HabitPage habitData={habit} />
}
