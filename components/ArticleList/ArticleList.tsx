import React, { useState } from 'react'
import { Article } from '../../types/Article'
import ArticlePresentation from '../ArticlePresentation/ArticlePresentation'
import { Category } from '../../types/Category'
import buildPaginationManager from '../../utils/pagination'
import Pagination from '../Pagination/Pagination'
interface Props {
  articles: Article[],
  chosenCategory: Category | null
}

const ARTICLES_PER_PEGE = 2

const ArticleList: React.FC<Props> = ({ articles, chosenCategory }) => {
  const [currentPage, set_currentPage] = useState(1)

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

  const { getCurrentPageItems, getPages } = buildPaginationManager<Article>({
    items: filteredArticles,
    currentPage: currentPage,
    itemsPerPage: ARTICLES_PER_PEGE
  })

  const pageArticles = getCurrentPageItems()
  const pages = getPages()

  let render;
  if (filteredArticles.length === 0) {
    render = (
      <p className="text-lg text-darkfont">
        Sem artigos nessa categoria 😔
      </p>
    )
  } else {
    render = (
      <>
        <div className="flex flex-col gap-12">
          {pageArticles.map((article, index) => {
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

        <div className="flex">
          <Pagination
            className="w-full my-4"
            pages={pages}
            currentPageState={[currentPage, set_currentPage]}
          />
        </div>
      </>
    )

  }

  return (
    <div className="flex flex-col mb-16">
      {render}      
    </div>    
  )
}

export default ArticleList
