import options from "@/app/api/auth/[...nextauth]/options"
import { getServerSession } from "next-auth"
import Image from "next/image"
import SignOut from "./SignOut"
import Link from "next/link"

export default async function Header() {
  const session = await getServerSession(options)
  return (
    <header className="py-3 px-3 bg-amber-500">
      <div className="container flex justify-between">
        <Link
          className="flex items-center justify-center gap-2"
          // @ts-ignore
          href={`/users/${session?.user.id}`}
        >
          <Image
            src={session?.user?.image as string}
            alt="User Image"
            width={40}
            height={40}
            className="rounded-full"
          />
          <p className="text-white font-semibold">{session?.user?.name}</p>
        </Link>
        <Link href={"/users"}>users</Link>
        <SignOut />
      </div>
    </header>
  )
}
