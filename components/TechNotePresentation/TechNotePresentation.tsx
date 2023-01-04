import React from "react"
import Link from "next/link"
import CategoryTag from "../CategoryTag/CategoryTag"

interface Props {
  title: string
  date: string
  slug: string
  categories: {
    id: string
    name: string
  }[]
}

const TechNotePresentation: React.FC<Props> = ({
  title,
  date,
  categories,
  slug,
}) => {
  return (
    <Link
      href={`/tech-notes/${slug}`}
      passHref={true}
      tabIndex={0}
      className="
        flex justify-between px-6 py-4
        hover:bg-gray-700 hover:rounded-md
        focus:bg-gray-700 focus:rounded-md
        cursor-pointer inde
      "
    >
      <div className="flex flex-col gap-2">
        <h5 className="text-darkfont text-xl">{title}</h5>

        <div className=" text-sm flex gap-3 text-darkfont">
          {categories.map((cat) => {
            return <CategoryTag key={cat.id}>{cat.name}</CategoryTag>
          })}
        </div>
      </div>
      <span className="text-gray-300 text-lg self-center">{date}</span>
    </Link>
  )
}

export default TechNotePresentation
