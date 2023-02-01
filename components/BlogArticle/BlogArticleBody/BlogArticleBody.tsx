import React from "react"
import { marked } from "marked"
import hljs from "highlight.js"

marked.setOptions({
  highlight: (code, lang) => {
    return hljs.highlight(code, {
      language: lang,
    }).value
  },
})

interface Props {
  markdownContent: string
}

const BlogArticleBody: React.FC<Props> = ({ markdownContent }) => {
  const html = marked(markdownContent, { gfm: true })

  return (
    <article
      dangerouslySetInnerHTML={{
        __html: html,
      }}
      className=""
    ></article>
  )
}

export default BlogArticleBody
