import Link from "next/link"

export default function Header() {
  return (
    <header className="py-5 px-3 bg-amber-500">
      <div className="container flex justify-between">
        <Link href={"/"}>
          <p className="text-white font-semibold text-xl">Habit Tracker</p>
        </Link>
        <p className=" whitespace-nowrap text-white">
          {new Date().toLocaleString().split(",")[0]}
        </p>
      </div>
    </header>
  )
}
