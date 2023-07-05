"use client"
import { useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"

interface IFormProps {
  _id: string
  name: string
}

export default function Page() {
  const { register, handleSubmit } = useForm<IFormProps>()
  const router = useRouter()
  const submitHandler: SubmitHandler<IFormProps> = async (date) => {
    try {
      await fetch(`/api/create-habit`, {
        body: JSON.stringify(date),
        method: "POST"
      })
      router.replace(`/`)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container text-white">
      <form onSubmit={handleSubmit(submitHandler)} className="mt-4">
        <div className="bg-[#252525] p-3 rounded-xl">
          <p className="mb-3">Name</p>
          <input
            {...register("name", { required: true })}
            name="name"
            placeholder="Daily Check-in"
            type="text"
            className=" placeholder:text-[#7a7a7a] px-3 py-2 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]"
            required
          />
        </div>
        <input
          type="submit"
          value="Submit"
          className="font-semibold cursor-pointer text-[#eeeeee] w-full bg-amber-500 p-2 mt-3 rounded-lg"
        />
      </form>
    </div>
  )
}
