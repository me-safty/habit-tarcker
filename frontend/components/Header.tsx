import Link from "next/link"

export default function Header() {
  return (
    <header className="py-1 px-3 bg-amber-500">
      <div className="container flex justify-center">
        <Link href={"/"}>
          <p className="text-white font-semibold text-xl">Habit Tracker</p>
        </Link>
      </div>
    </header>
  )
}
