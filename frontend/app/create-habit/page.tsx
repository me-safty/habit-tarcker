"use client"
import { FormEvent } from "react";

export default function Page() {
  function submitHandler(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    console.log(e)
  }
  return (
    <div className="container text-white">
      <form action="" onSubmit={(e) => submitHandler(e)} className="mt-4">
        <div className="bg-[#252525] p-3 rounded-xl">
          <p className="mb-3">Name</p>
          <input placeholder="Daily Check-in" type="text" className=" placeholder:text-[#7a7a7a] px-3 py-2 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]" required />
        </div>
        <input type="submit" value="Submit" className="font-semibold text-[#eeeeee] w-full bg-amber-500 p-2 mt-3 rounded-lg" />
      </form>
    </div>
  )
}
