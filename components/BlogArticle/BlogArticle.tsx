import React from "react"
import { Article } from "../../types/Article"
import BlogArticleHeader from "./BlogArticleHeader/BlogArticleHeader"
import BlogArticleBody from "./BlogArticleBody/BlogArticleBody"
import ProseContainer from "../containers/ProseContainer/ProseContainer"
import { TechNote } from "../../types/TechNote"

interface Props {
  article: Article | TechNote
}

const BlogArticle: React.FC<Props> = ({ article }) => {
  const { body } = article

  return (
    <ProseContainer>
      <BlogArticleHeader article={article} />

      <BlogArticleBody markdownContent={body} />
    </ProseContainer>
  )
}

export default BlogArticle
