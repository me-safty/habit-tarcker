import Image from "next/image"

export default function UserBox({
  imglink,
  name,
}: {
  imglink: string
  name: string
}) {
  return (
    <section className="flex bg-[color:var(--secondaryColor)] mb-2 rounded-xl py-2 items-center w-[330px] max-w-[400px] justify-center gap-5">
      <Image
        src={imglink as string}
        alt="User Image"
        width={50}
        height={50}
        className="rounded-full"
      />
      <p className="text-white bg-[color:var(--mainColor)] rounded-xl p-2 px-3 text-xl font-semibold">
        {name}
      </p>
    </section>
  )
}
