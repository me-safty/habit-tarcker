import { sanityClint } from "@/client"
import Tasks from "@/components/Tasks"
import { Task } from "@/types"

export const revalidate = 1 // revalidate every hour

async function getHabits() {
  // const res = fetch(`${process.env.URL}/api/get-habits`, {
  //   method: "GET",
  //   cache: "no-store",
  //   next: {
  //     tags: ["habits"],
  //   },
  // })
  // return (await res).json()

  return await sanityClint.fetch(`
  *[_type == "habit"] {
    _id,
    _createdAt,
    name,
    currentStreak,
    bestStreak,
    dates,
    slug,
  }
`)
}

const habits: Task[] = [
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
  const habits: Task[] = await getHabits()
  console.log(habits)
  return (
    <main className="container">
      <Tasks tasks={habits} />
    </main>
  )
}
