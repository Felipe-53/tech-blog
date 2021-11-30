import React from 'react'
import { Article } from '../../types/Article'
import ArticlePresentation from '../ArticlePresentation/ArticlePresentation'
import { Category } from '../../types/Category'
import MainHeading from '../../components/typographic/MainHeading/MainHeading'

interface Props {
  articles: Article[],
  chosenCategory: Category | null
}

const ArticleList: React.FC<Props> = ({ articles, chosenCategory }) => {

  let filteredArticles;
  if (!chosenCategory) {
    filteredArticles = articles;
  } else {
    filteredArticles = articles.filter(art => {
      for (const category of art.categories) {
        if (category.id === chosenCategory.id) {
          return true
        }
      }
      return false
    })
  }

  let render;
  if (filteredArticles.length === 0) {
    render = (
      <p className="text-lg text-darkfont">
        Sem artigos nessa categoria 😔
      </p>
    )
  } else {
    render = (
      <div className="flex flex-col gap-12">
        {filteredArticles.map((article, index) => {
            const { id, title, excerpt, created_at, last_updated, slug, 
              author, categories, body } = article;
            return (
              <ArticlePresentation
                key={id}
                id={id}
                title={title}
                excerpt={excerpt}
                created_at={created_at}
                last_updated={last_updated}
                disableDivider={index === articles.length - 1}
                slug={slug}
                categories={categories}
                body={body}
                author={author}
              />
            )
          })}
      </div>
    )
  }

  return (
    <div className="flex flex-col mb-16">
      <MainHeading className="text-center mb-8">
        Artigos
      </MainHeading>

      {render}      
    </div>    
  )
}

export default ArticleList
