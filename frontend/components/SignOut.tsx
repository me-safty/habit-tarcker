"use client"
import { signOut } from "next-auth/react"

export default function SignOut() {
  return (
    <button
      className="px-2 font-semibold bg-opacity-60 bg-white rounded-xl text-white"
      onClick={() => signOut()}
    >
      SignOut
    </button>
  )
}
