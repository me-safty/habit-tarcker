import { User } from "@/types"
import UserHabits from "./UserHabits"
// import MiniCalender from "../habits/MiniCalender"
import UserBox from "./UserBox"
// import calcStreak from "@/lib/calcStreak"

export default function UserPage({ user }: { user: User }) {
  const habitsWithStreak = user.habits
  // .map((habit) => ({
  //   ...habit,
  //   currentStreak: calcStreak(habit.dates),
  // }))
  return (
    <>
      {/* <MiniCalender /> */}
      <UserBox name={user.name} imglink={user.imglink} />
      {user.habits.length > 0 ? (
        <UserHabits habits={habitsWithStreak} />
      ) : (
        <p className="text-white">no habits</p>
      )}
    </>
  )
}
