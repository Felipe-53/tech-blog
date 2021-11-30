import React from 'react'
import {marked } from 'marked'

interface Props {
  markdownContent: string
}

const BlogArticleBody: React.FC<Props> = ({ markdownContent }) => {
  const html = marked(markdownContent)

  return (
    <div dangerouslySetInnerHTML={{
      __html: html
    }} className="">
      
    </div>
  )
}

export default BlogArticleBody
