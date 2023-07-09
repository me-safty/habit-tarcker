import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
}

const sanityClint = createClient(config)

export async function PUT(request: Request) {
  const { name, _id, bestStreak, currentStreak, slug, dates } =
    await request.json()

  try {
    await sanityClint.createOrReplace({
      _id,
      _type: "habit",
      name,
      bestStreak,
      currentStreak,
      slug: {
        _type: "slug",
        current: slug,
      },
      dates,
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Could't mark the habit done", error })
  }
  console.log("habit done")
  return NextResponse.json({ message: "Habit Done" })
}
