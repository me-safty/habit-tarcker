import { NextResponse } from "next/server"
import { createClient } from "next-sanity"

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
  apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
  // token: process.env.SANITY_API_TOKEN,
  useCdn: false,
}

const sanityClint = createClient(config)

// export const fetchCache = "force-no-store"
export const revalidate = false

export async function GET() {
  try {
    const habits = await sanityClint.fetch(`
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
    return NextResponse.json(habits)
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: "Could't get the habits", error })
  }
}
