import React, { useState } from 'react'
import ArticleList from '../ArticleList/ArticleList'
import Categories from '../Categories/Categories'
import { Category } from '../../types/Category'
import Introduction from '../Introduction/Introduction'
import { Article } from '../../types/Article'

interface Props {
  articles: Article[],
  categories: Category[],
  positioningClasses?: string
}

const HomeMain: React.FC<Props> = ({ articles, categories, positioningClasses }) => {
  const [chosenCategory, set_chosenCategory] = useState<Category | null>(null)

  return (
    <div 
      onClick={() => set_chosenCategory(null)}
      className={`max-w-screen-md mx-auto reading-padding
      col-start-1 col-end-5
      flex flex-col gap-14 items-center
      ${positioningClasses}
      `}
    >
      <Introduction />

      <Categories
        categories={categories}
        chosenCategory={chosenCategory}
        set_chosenCategory={set_chosenCategory}
      />

      <ArticleList
        articles={articles}
        chosenCategory={chosenCategory}
      />
    </div>
  )
}

export default HomeMain
