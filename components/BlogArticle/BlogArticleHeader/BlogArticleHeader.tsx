import React from "react"
import { Article } from "../../../types/Article"
import { TechNote } from "../../../types/TechNote"
import parseDatetime from "../../../utils/parseDatetime"
import CategoryTag from "../../CategoryTag/CategoryTag"
import { SiteLink } from "../../SiteLink/SiteLink"

interface Props {
  article: Article | TechNote
}

const BlogArticleHeader: React.FC<Props> = ({ article }) => {
  const { author, created_at, categories } = article

  const date = parseDatetime(created_at).toLocaleDateString("pt-br")

  return (
    <div className="mb-8">
      <h1
        style={{
          marginTop: 0,
          marginBottom: 4,
        }}
      >
        {article.title}
      </h1>

      <p
        style={{
          marginTop: 0,
          marginBottom: "1rem",
        }}
      >
        <span>Por </span>
        <SiteLink href={author.href}>{author.name}</SiteLink>,
        <span> {date}</span>
      </p>

      <div className="flex gap-6 text-base">
        {categories.map((cat) => {
          return <CategoryTag key={cat.id}>{cat.name}</CategoryTag>
        })}
      </div>
    </div>
  )
}

export default BlogArticleHeader
