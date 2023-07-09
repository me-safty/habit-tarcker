import { createClient } from "next-sanity"
import { revalidatePath } from "next/cache"

export default function CreateHabitForm() {
  async function createHabit(e: FormData) {
    "use server"
    const name = e.get("name")?.toString().toLowerCase().split(" ").join("-")
    if (!name) return

    const config = {
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID as string,
      apiVersion: process.env.NEXT_PUBLIC_API_VERSION,
      token: process.env.SANITY_API_TOKEN,
      useCdn: false,
    }

    const sanityClint = createClient(config)

    try {
      await sanityClint.create({
        _type: "habit",
        name,
        bestStreak: 0,
        currentStreak: 0,
        slug: {
          _type: "slug",
          current: name,
        },
        dates: [],
      })
      // revalidatePath("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container text-white">
      <form className="mt-4" action={createHabit}>
        <div className="bg-[#252525] p-3 rounded-xl">
          <p className="mb-3">Name</p>
          <input
            name="name"
            placeholder="Daily Check-in"
            type="text"
            className=" placeholder:text-[#7a7a7a] px-3 py-2 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]"
            required
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="font-semibold cursor-pointer text-[#eeeeee] w-full bg-amber-500 p-2 mt-3 rounded-lg"
        />
      </form>
    </div>
  )
}
