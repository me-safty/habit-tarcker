import Habits from "@/components/Habits"
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
    category ->,
    "categories": *[_type == "category" ]
  }
`
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["habits"],
      },
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
    category: {
      name: "mourning",
      _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
    },
    categories: [
      {
        _rev: "oT88RoYgRCgDLbhlGiMrv6",
        _type: "category",
        name: "morning",
        _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
      },
      {
        _rev: "m2wUiRJct46GQ5hw1wETy3",
        _type: "category",
        name: "night",
        _id: "dd38ca00-e87f-4027-87b8-362f9591e841",
      },
    ],
    dates: [
      {
        date: "7/13/2023",
        _type: "dateOfHabit",
        _key: "jh67hk46rgo-7/11/2023",
      },
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
  {
    _id: "Grgr",
    _createdAt: "Ferfwer",
    name: "brush",
    bestStreak: 10,
    currentStreak: 0,
    slug: {
      current: "Efef",
    },
    category: {
      name: "mourning",
      _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
    },
    categories: [
      {
        _rev: "oT88RoYgRCgDLbhlGiMrv6",
        _type: "category",
        name: "morning",
        _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
      },
      {
        _rev: "m2wUiRJct46GQ5hw1wETy3",
        _type: "category",
        name: "night",
        _id: "dd38ca00-e87f-4027-87b8-362f9591e841",
      },
    ],
    dates: [
      {
        date: "7/11/2023",
        _type: "dateOfHabit",
        _key: "jh67hk46rgo-7/11/2023",
      },
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
  {
    _id: "Grgr",
    _createdAt: "Ferfwer",
    name: "brush",
    bestStreak: 10,
    currentStreak: 0,
    slug: {
      current: "Efef",
    },
    category: {
      name: "night",
      _id: "dd38ca00-e87f-4027-87b8-362f9591e841",
    },
    categories: [
      {
        _rev: "oT88RoYgRCgDLbhlGiMrv6",
        _type: "category",
        name: "morning",
        _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
      },
      {
        _rev: "m2wUiRJct46GQ5hw1wETy3",
        _type: "category",
        name: "night",
        _id: "dd38ca00-e87f-4027-87b8-362f9591e841",
      },
    ],
    dates: [
      {
        date: "7/13/2023",
        _type: "dateOfHabit",
        _key: "jh67hk46rgo-7/11/2023",
      },
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
  // console.log(habits)
  return (
    <main className="container flex justify-center">
      <Habits habitsData={habits} />
    </main>
  )
}
