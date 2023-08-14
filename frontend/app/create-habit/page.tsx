import HabitForm from "@/components/HabitForm"
import { createHabit } from "@/lib/serverActions"
import { Category } from "@/types"
import { User, getServerSession } from "next-auth"
import options from "../api/auth/[...nextauth]/options"
import { redirect } from "next/navigation"

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
  const session = await getServerSession(options)

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/")
  }

  return (
    <main className="container text-white">
      <div className="mt-3">
        <HabitForm
          actionFunction={createHabit}
          categories={categories}
          redirectPageLink="/"
          session={session as unknown as { user: User }}
        />
      </div>
    </main>
  )
}
