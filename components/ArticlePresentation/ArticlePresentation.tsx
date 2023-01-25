import React from "react"
import Link from "next/link"
import { Article } from "../../types/Article"
import MediumHeading from "../typographic/MediumHeading/MediumHeading"
import CategoryTag from "../CategoryTag/CategoryTag"
import parseDatetime from "../../utils/parseDatetime"

interface Props extends Article {
  disableDivider?: boolean
}

const ArticlePresentation: React.FC<Props> = (props) => {
  const { title, excerpt, created_at, slug, categories } = props

  return (
    <Link
      href={`/artigos/${slug}`}
      passHref={true}
      onClick={(e) => e.stopPropagation()}
      className="p-8 hover:outline hover:outline-2 hover:outline-secondary rounded-md bg-gray-700 hover:cursor-pointer"
    >
      <MediumHeading>{title}</MediumHeading>

      <div className="flex text-base h-min gap-4 mt-2">
        {categories.map((cat) => {
          return <CategoryTag key={cat.id}>{cat.name}</CategoryTag>
        })}
      </div>

      <p className="text-gray-300 text-lg mt-4 mb-4">
        {parseDatetime(created_at).toLocaleDateString("pt-br")}
      </p>
      <p className="text-darkfont text-lg">{excerpt}</p>
    </Link>
  )
}

export default ArticlePresentation
