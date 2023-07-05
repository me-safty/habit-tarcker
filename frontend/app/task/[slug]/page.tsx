import { sanityClint } from "@/client"
import TaskPage from "@/components/TaskPage"
import { Task } from "@/typing"
import { groq } from "next-sanity"

interface TaskPagProps {
  params: { slug: string }
}

// const task: Task = {
//   name: "brush",
//   bestStreak: 10,
//   dates: [
//     {
//       date: "11/28/2022",
//     },
//     {
//       date: "11/29/2022",
//     },
//     {
//       date: "11/30/2022",
//     },
//     {
//       date: "11/25/2022",
//     },
//     {
//       date: "6/29/2023",
//     },
//     {
//       date: "6/30/2023",
//     },
//     {
//       date: "7/1/2023",
//     },
//     {
//       date: "7/2/2023",
//     },
//     {
//       date: "7/3/2023",
//     },
//     {
//       date: "7/4/2023",
//     },
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
      dates,
      slug,
    }
    `,
    { slug }
  )
}

export default async function page({ params }: TaskPagProps) {
  const habit: Task = await getHabit(params.slug)
  console.log(habit)
  return <TaskPage task={habit} />
}
