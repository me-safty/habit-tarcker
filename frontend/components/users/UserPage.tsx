import { User } from "@/types"
import Image from "next/image"
import UserHabits from "./UserHabits"

export default function UserPage({ user }: { user: User }) {
  return (
    <>
      <section className="flex items-center w-[330px] max-w-[400px] justify-center gap-2">
        <Image
          src={user.imglink as string}
          alt="User Image"
          width={40}
          height={40}
          className="rounded-full"
        />
        <p className="text-white font-semibold">{user.name}</p>
      </section>
      <UserHabits habits={user.habits} />
    </>
  )
}
