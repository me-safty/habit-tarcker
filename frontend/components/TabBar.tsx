"use client"

import { setExpandView } from "@/store/habitsSlice"
import {
  AlignJustify,
  Home,
  LayoutGrid,
  LogOut,
  Plus,
  Users2,
} from "lucide-react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { useAppDispatch, useAppSelector } from "./habits/Habits"

export default function TabBar() {
  const dispatch = useAppDispatch()
  const expandView = useAppSelector((state) => state.habits.expandView)

  return (
    <section className="flex items-center justify-center w-full bg-[color:var(--bodyColor)] py-4">
      <nav className="bg-[color:var(--mainColor)] p-2 rounded-full flex items-center w-[330px]">
        <Link
          href={"/create-habit"}
          className="bg-[color:var(--checkColor)] w-fit py-2 px-3 pe-4 rounded-full flex items-center justify-center gap-1 text-white"
        >
          <Plus color="#fff" /> New
        </Link>
        <section className="flex mx-2 items-center justify-around flex-1">
          <Link href={"/"}>
            <Home color="#fff" />
          </Link>
          <Link href={"/users"}>
            <Users2 color="#fff" size={28} />
          </Link>
          <button onClick={() => signOut()}>
            <LogOut color="#fff" />
          </button>
          <button onClick={() => dispatch(setExpandView(!expandView))}>
            {expandView ? (
              <LayoutGrid color="#fff" />
            ) : (
              <AlignJustify color="#fff" />
            )}
          </button>
        </section>
      </nav>
    </section>
  )
}
