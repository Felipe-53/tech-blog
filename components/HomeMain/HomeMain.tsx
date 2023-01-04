import React, { useEffect, useState } from "react"
import ArticleList from "../ArticleList/ArticleList"
import Introduction from "../Introduction/Introduction"
import { Article } from "../../types/Article"
import MainHeading from "../../components/typographic/MainHeading/MainHeading"
import TechNotes from "../TechNotes/TechNotes"
import { TechNote } from "../../types/TechNote"
import { Category } from "../../types/Category"
import CategoryTag from "../CategoryTag/CategoryTag"

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
      className={`max-w-screen-md mx-auto reading-padding
      flex flex-col gap-14 items-center
      `}
    >
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,500,1,0"
      />

      <Introduction />

      <MainHeading id="artigos" className="text-center">
        Artigos
      </MainHeading>

      <div className="w-full flex justify-between text-lg -mb-8 text-darkfont">
        <span className="flex items-center">
          <span className="font-semibold mr-2">Tags:</span>

          <CategoryTag>
            {chosenCategory ? chosenCategory.name : "Todas"}
          </CategoryTag>
        </span>

        {chosenCategory ? (
          <button
            className="flex items-center font-semibold hover:text-secondary"
            onClick={() => set_chosenCategory(null)}
          >
            <span
              style={{ fontSize: "2rem" }}
              className="material-symbols-outlined"
            >
              backspace
            </span>
          </button>
        ) : null}
      </div>

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
