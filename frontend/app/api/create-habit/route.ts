import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  apiVersion: "2022-12-17",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
}

const sanityClint = createClient(config)

export async function POST(request: Request) {
  const { name } = await request.json()

  try {
    await sanityClint.create({
      _type: "habit",
      name,
      bestStreak: 0,
      slug: {
        _type: "slug",
        current: name.toLowerCase(),
      },
      dates: [],
    })
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Could't create the author", error })
  }
  console.log("habit created")
  return NextResponse.json({ message: "Habit Created" })
}
