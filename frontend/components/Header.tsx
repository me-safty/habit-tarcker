export default function Header() {
  return (
    <header className="py-5 px-3 bg-amber-500">
      <div className="container flex justify-between">
        <p>Header</p>
        <p className=" whitespace-nowrap">
          {new Date().toLocaleString().split(",")[0]}
        </p>
      </div>
    </header>
  )
}
