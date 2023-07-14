import HabitForm from "@/components/HabitForm"
import { createHabit } from "@/lib/serverActions"

export default function Page() {
  return (
    <main className="container text-white">
      <div className="mt-3">
        <HabitForm actionFunction={createHabit} redirectPageLink="/" />
      </div>
    </main>
  )
}
