"use client"
import { signIn } from "next-auth/react"

export default function SignIn() {
  return (
    <button aria-label="signin" onClick={() => signIn()}>
      SignIn
    </button>
  )
}
