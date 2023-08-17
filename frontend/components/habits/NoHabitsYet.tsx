import Image from "next/image"
import add from "@/public/add.svg"
import Link from "next/link"

export default function NoHabitsYet() {
  return (
    <section className="p-3 flex flex-col items-center">
      <p className="text-white p-2 rounded-lg bg-white bg-opacity-20">
        no habits yet !!
      </p>
      <div className="flex items-center justify-center gap-2">
        <p className="text-white">add one now</p>
        <Link
          href={"/create-habit"}
          className="w-fit inline-block outline-none"
        >
          <button
            aria-label="add-habit"
            className="bg-white bg-opacity-20 p-[10px] my-2 rounded-lg"
          >
            <Image src={add} height={20} width={20} alt="add habit" />
          </button>
        </Link>
      </div>
    </section>
  )
}
