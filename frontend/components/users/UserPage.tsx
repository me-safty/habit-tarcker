import { User } from "@/types"
import UserHabits from "./UserHabits"
import MiniCalender from "../habits/MiniCalender"
import UserBox from "./UserBox"

export default function UserPage({ user }: { user: User }) {
  return (
    <>
      {/* <MiniCalender /> */}
      <UserBox name={user.name} imglink={user.imglink} />
      {user.habits.length > 0 ? (
        <UserHabits habits={user.habits} />
      ) : (
        <p className="text-white">no habits</p>
      )}
    </>
  )
}
