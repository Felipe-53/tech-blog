import React, { useEffect, useState } from 'react'
import ArticleList from '../ArticleList/ArticleList'
import Categories from '../Categories/Categories'
import { Category } from '../../types/Category'
import Introduction from '../Introduction/Introduction'
import { Article } from '../../types/Article'
import MainHeading from '../../components/typographic/MainHeading/MainHeading'
import TechNotes from '../TechNotes/TechNotes'

interface Props {
  articles: Article[],
  categories: Category[],
  positioningClasses?: string
}

const HomeMain: React.FC<Props> = ({ articles, categories, positioningClasses }) => {
  const [chosenCategory, set_chosenCategory] = useState<Category | null>(null)
  const [currentPage, set_currentPage] = useState(1)

  useEffect(() => {
    set_currentPage(1)
  }, [chosenCategory])

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

      <MainHeading id="artigos" className="text-center">
        Artigos
      </MainHeading>

      <Categories
        categories={categories}
        chosenCategory={chosenCategory}
        set_chosenCategory={set_chosenCategory}
      />

      <ArticleList
        articles={articles}
        chosenCategory={chosenCategory}
        currentPageState={[currentPage, set_currentPage]}
      />

      <TechNotes

      />
    </div>
  )
}

export default HomeMain
