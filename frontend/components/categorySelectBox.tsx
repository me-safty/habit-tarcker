import { Dispatch, SetStateAction, useEffect, useRef } from "react"
import Image from "next/image"
import arrowLeft from "@/public/keyboard_arrow_left.svg"
import { Category } from "@/types"

interface CategorySelectBoxProps {
  selectedCategory: Category
  setSelectedCategory: Dispatch<SetStateAction<Category>>
  categories: Category[]
  setShowOptionsBox: Dispatch<SetStateAction<boolean>>
  showOptionsBox: boolean
}

export default function CategorySelectBox({
  selectedCategory,
  setSelectedCategory,
  categories,
  showOptionsBox,
  setShowOptionsBox,
}: CategorySelectBoxProps) {
  const optionsBox = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        optionsBox.current &&
        !optionsBox.current.contains(e.target as Node)
      ) {
        setShowOptionsBox(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [optionsBox, setShowOptionsBox])

  return (
    <div className="relative">
      <div
        className={`${
          selectedCategory ?? "text-[#7a7a7a]"
        } text-white flex justify-between px-3 py-2 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]`}
        onClick={() => {
          setShowOptionsBox((p) => !p)
        }}
      >
        <p>
          {selectedCategory ? selectedCategory.name : "select the category"}
        </p>
        <Image
          src={arrowLeft}
          width={20}
          height={20}
          alt="arrow left"
          className={`select-none cursor-pointer transition ${
            showOptionsBox ? "rotate-90" : "-rotate-90"
          } `}
        />
      </div>
      {showOptionsBox && (
        <div
          ref={optionsBox}
          style={{ boxShadow: "0px 1px 5px 0px #000000c2" }}
          className="text-white p-2 shadow-xl absolute flex flex-col gap-1 rounded-lg w-full outline-none caret-amber-500 bg-[#353535]"
        >
          {categories?.map((category) => (
            <div
              className={`
                p-1
                px-2
                transition
                rounded-md
                ${
                  selectedCategory?._id === category?._id
                    ? "bg-[#272727]"
                    : "hover:bg-[#2e2e2e]"
                }
              `}
              key={category._id}
              onClick={() => {
                setSelectedCategory(category)
                setShowOptionsBox(false)
              }}
            >
              <p>{category.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
