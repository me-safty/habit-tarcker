import HabitForm from "@/components/HabitForm"
import { createHabit } from "@/lib/serverActions"
import { Category } from "@/types"

const categories = [
  {
    name: "morning",
    _id: "5b70e5c2-d43c-4fed-be4c-16be480403dc",
  },
  {
    name: "night",
    _id: "dd38ca00-e87f-4027-87b8-362f9591e841",
  },
]

async function getCategories() {
  const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
  const apiVersion = process.env.NEXT_PUBLIC_API_VERSION
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const query = `*[_type == "category"]`
  const res = await fetch(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodeURIComponent(
      query
    )}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  )
  const categories = await res.json()
  return categories.result
}

export default async function Page() {
  const categories: Category[] = await getCategories()

  return (
    <main className="container text-white">
      <div className="mt-3">
        <HabitForm
          actionFunction={createHabit}
          categories={categories}
          redirectPageLink="/"
        />
      </div>
    </main>
  )
}
