import React, { useMemo, useState } from 'react'
import { Article } from '../../types/Article'
import ArticlePresentation from '../ArticlePresentation/ArticlePresentation'
import { Category } from '../../types/Category'
import { PaginationManager } from '../../utils/pagination'
import Pagination from '../Pagination/Pagination'
interface Props {
  articles: Article[],
  chosenCategory: Category | null,
  currentPageState: [number, React.Dispatch<React.SetStateAction<number>>]
}

const ARTICLES_PER_PEGE = 3

const ArticleList: React.FC<Props> = ({ articles, chosenCategory, currentPageState }) => {
  const [currentPage, set_currentPage] = currentPageState

  let filteredArticles: Article[];
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

  const manager = new PaginationManager<Article>({
    items: filteredArticles,
    currentPage,
    itemsPerPage: ARTICLES_PER_PEGE,
    setPage: set_currentPage
  })

  const pageArticles = manager.getCurrentPageItems()
  const pages = manager.getPages()

  let render;
  if (filteredArticles.length === 0) {
    render = (
      <div className='min-h-[900px]'>
        <p className="text-lg text-darkfont my-8">
          Sem artigos nessa categoria 😔
        </p>
      </div>
    )
  } else {
    render = (
      <>
        <div className="flex flex-col gap-12 min-h-[900px]">
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

        <Pagination
          className="w-full mt-12 p-2 rounded-md"
          pages={pages}
          currentPageState={[currentPage, set_currentPage]}
        />
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
