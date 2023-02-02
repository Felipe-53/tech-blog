import React, { useContext, useEffect, useState } from "react"
import ArticleList from "../ArticleList/ArticleList"
import Introduction from "../Introduction/Introduction"
import { Article } from "../../types/Article"
import MainHeading from "../../components/typographic/MainHeading/MainHeading"
import TechNotes from "../TechNotes/TechNotes"
import { TechNote } from "../../types/TechNote"
import { Category } from "../../types/Category"
import CategoryTag from "../CategoryTag/CategoryTag"
import BackspaceIcon from "../Icons/Backspace"
import EmailSubscriptionPrompt from "../EmailSubscriptionPrompt/EmailSubscriptionPrompt"
import { AppContext } from "../../pages/_app"
import Divider from "../decorative/Divider/Divider"

interface Props {
  articles: Article[]
  categories: Category[]
  techNotes: TechNote[]
  categoryState: [
    Category | null,
    React.Dispatch<React.SetStateAction<Category | null>>
  ]
}

export const mainScreenPositioningStyles = "max-w-screen-md mx-auto px-7"

const HomeMain: React.FC<Props> = ({ articles, categoryState, techNotes }) => {
  const [chosenCategory, set_chosenCategory] = categoryState
  const [currentPage, set_currentPage] = useState(1)
  const appContext = useContext(AppContext)
  const [_, setSuccessfulSubscriptionRequest] =
    appContext!.successfulEmailSubscriptionState

  useEffect(() => {
    set_currentPage(1)
  }, [chosenCategory])

  return (
    <div
      className={`
        ${mainScreenPositioningStyles}
        flex flex-col gap-14 items-center
      `}
    >
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
            <BackspaceIcon className="fill-darkfont hover:fill-secondary" />
          </button>
        ) : null}
      </div>

      <ArticleList
        articles={articles}
        chosenCategory={chosenCategory}
        currentPageState={[currentPage, set_currentPage]}
      />

      <TechNotes techNotes={techNotes} />

      <Divider thickness={1} color={"gray"} />

      <EmailSubscriptionPrompt
        setSuccessfulSubscriptionRequest={setSuccessfulSubscriptionRequest}
      />
    </div>
  )
}

export default HomeMain
