import React, { useContext } from "react"
import { Article } from "../../types/Article"
import BlogArticleHeader from "./BlogArticleHeader/BlogArticleHeader"
import BlogArticleBody from "./BlogArticleBody/BlogArticleBody"
import ProseContainer from "../containers/ProseContainer/ProseContainer"
import { TechNote } from "../../types/TechNote"
import EmailSubscriptionPrompt from "../EmailSubscriptionPrompt/EmailSubscriptionPrompt"
import { AppContext } from "../../pages/_app"
import Divider from "../decorative/Divider/Divider"

interface Props {
  article: Article | TechNote
}

const BlogArticle: React.FC<Props> = ({ article }) => {
  const { body } = article
  const [_, setSuccessfulSubscriptionRequest] =
    useContext(AppContext)!.successfulEmailSubscriptionState
  return (
    <>
      <ProseContainer>
        <BlogArticleHeader article={article} />

        <BlogArticleBody markdownContent={body} />

        <Divider className="my-14" color="gray" thickness={1} />
      </ProseContainer>

      {/* <div className="my-14 mx-auto w-24 flex justify-between">
        <span className="w-2 h-2 rounded-full bg-darkfont block"></span>
        <span className="w-2 h-2 rounded-full bg-darkfont block"></span>
        <span className="w-2 h-2 rounded-full bg-darkfont block"></span>
      </div> */}

      <EmailSubscriptionPrompt
        setSuccessfulSubscriptionRequest={setSuccessfulSubscriptionRequest}
      />
    </>
  )
}

export default BlogArticle
