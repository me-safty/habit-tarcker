import { sanityClint } from "@/client"
import TaskPage from "@/components/TaskPage"
import { Task } from "@/types"
import { groq } from "next-sanity"

interface TaskPagProps {
  params: { slug: string }
}

// const task: Task = {
//   _id: "Grgr",
//   _createdAt: "Ferfwer",
//   name: "brush",
//   bestStreak: 10,
//   currentStreak: 0,
//   slug: {
//     current: "Efef",
//   },
//   dates: [
//     // {
//     //   date: "11/28/2022",
//     // },
//     // {
//     //   date: "11/29/2022",
//     // },
//     // {
//     //   date: "11/30/2022",
//     // },
//     // {
//     //   date: "11/25/2022",
//     // },
//     // {
//     //   date: "6/29/2023",
//     // },
//     // {
//     //   date: "6/30/2023",
//     // },
//     // {
//     //   date: "7/1/2023",
//     // },
//     // {
//     //   date: "7/2/2023",
//     // },
//     // {
//     //   date: "7/3/2023",
//     // },
//     // {
//     //   date: "7/4/2023",
//     // },
//     // {
//     //   date: "7/5/2023",
//     // },
//   ],
// }

async function getHabit(slug: string) {
  return sanityClint.fetch(
    groq`
    *[_type == "habit" && slug.current == $slug][0] {
      _id,
      _createdAt,
      name,
      bestStreak,
      currentStreak,
      dates,
      slug,
    }
    `,
    { slug }
  )
}

// async function getHabit(slug: string) {
//   const res = fetch(`${process.env.URL}/api/get-habit`, {
//     method: "GET",
//     cache: "no-store",
//     body: JSON.stringify({ slug }),
//   })
//   return (await res).json()
// }

export default async function page({ params }: TaskPagProps) {
  const habit: Task = await getHabit(params.slug)
  return <TaskPage habitData={habit} />
}
