import React from 'react'
import { Article } from '../../../types/Article'
import Link from 'next/link'
import { TechNote } from '../../../types/TechNote';

interface Props  {
  article: Article | TechNote
}

const BlogArticleHeader: React.FC<Props> = ({ article }) => {
  const { author, created_at, categories } = article;

  return (
    <div className="mb-8">
      <h2 style={{
        marginTop: 0,
        marginBottom: 4
      }}>{article.title}</h2>

      <p style={{
        marginTop: 0,
        marginBottom: '1rem'
      }}>
        <span>Por </span>
        <Link href={author.href}>
          <a
            className="text-primary hover:text-secondary"
            style={{
              textDecoration: 'none',
          }}>
            {author.name}
          </a>
        </Link>,
        <span> {created_at}</span>
      </p>

      <div className="flex gap-4">
        {categories.map(cat => {
          return (
            <span
              key={cat.id}
              className="text-base bg-primary rounded-full py-2 px-4"
            >
              {cat.name}
            </span>
          )
        })}     
      </div>
    </div>
  )
}

export default BlogArticleHeader
