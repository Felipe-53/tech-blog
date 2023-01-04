import React, { useEffect, useState } from "react"
import ArticleList from "../ArticleList/ArticleList"
import Categories from "../Categories/Categories"
import { Category } from "../../types/Category"
import Introduction from "../Introduction/Introduction"
import { Article } from "../../types/Article"
import MainHeading from "../../components/typographic/MainHeading/MainHeading"
import TechNotes from "../TechNotes/TechNotes"
import { TechNote } from "../../types/TechNote"

interface Props {
  articles: Article[]
  categories: Category[]
  techNotes: TechNote[]
  categoryState: [
    Category | null,
    React.Dispatch<React.SetStateAction<Category | null>>
  ]
}

const HomeMain: React.FC<Props> = ({ articles, categoryState, techNotes }) => {
  const [chosenCategory, set_chosenCategory] = categoryState
  const [currentPage, set_currentPage] = useState(1)

  useEffect(() => {
    set_currentPage(1)
  }, [chosenCategory])

  return (
    <div
      onClick={() => set_chosenCategory(null)}
      className={`max-w-screen-md mx-auto reading-padding
      flex flex-col gap-14 items-center
      `}
    >
      <Introduction />

      <MainHeading id="artigos" className="text-center">
        Artigos
      </MainHeading>

      {/* <Categories
        categories={categories}
        chosenCategory={chosenCategory}
        set_chosenCategory={set_chosenCategory}
      /> */}

      <ArticleList
        articles={articles}
        chosenCategory={chosenCategory}
        currentPageState={[currentPage, set_currentPage]}
      />

      <TechNotes techNotes={techNotes} />
    </div>
  )
}

export default HomeMain
