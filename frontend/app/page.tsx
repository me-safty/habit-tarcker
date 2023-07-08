import Tasks from "@/components/Tasks"
import { Task } from "@/types"

async function getHabits() {
  const res = fetch(`${process.env.URL}/api/get-habits`, {
    method: "GET",
    cache: "no-store",
    next: {
      tags: ["habits"],
    },
  })
  return (await res).json()
}

// const habits: Task[] = [
//   {
//     _id: "Grgr",
//     _createdAt: "Ferfwer",
//     name: "brush",
//     bestStreak: 10,
//     currentStreak: 0,
//     slug: {
//       current: "Efef",
//     },
//     dates: [
//       // {
//       //   date: "11/28/2022",
//       // },
//       // {
//       //   date: "11/29/2022",
//       // },
//       // {
//       //   date: "11/30/2022",
//       // },
//       // {
//       //   date: "11/25/2022",
//       // },
//       // {
//       //   date: "6/29/2023",
//       // },
//       // {
//       //   date: "6/30/2023",
//       // },
//       // {
//       //   date: "7/1/2023",
//       // },
//       // {
//       //   date: "7/2/2023",
//       // },
//       // {
//       //   date: "7/3/2023",
//       // },
//       // {
//       //   date: "7/4/2023",
//       // },
//       // {
//       //   date: "7/5/2023",
//       // },
//     ],
//   },
// ]

export default async function Home() {
  const habits: Task[] = await getHabits()
  console.log(habits)
  return (
    <main className="container">
      <Tasks tasks={habits} />
    </main>
  )
}
