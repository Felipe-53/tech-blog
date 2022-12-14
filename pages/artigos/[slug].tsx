import React from "react"
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next"
import { getArticleFromSlug, getArticles } from "../../utils/articleUtils"
import { Article } from "../../types/Article"
import BlogArticle from "../../components/BlogArticle/BlogArticle"
import Meta from "../../components/Layout/Meta/Meta"

interface Props {
  article: Article
}

const Article: React.FC<Props> = ({ article }) => {
  const { title, excerpt, og_image_url } = article

  return (
    <>
      <Meta title={title} description={excerpt} ogImageUrl={og_image_url} />
      <BlogArticle article={article} />
    </>
  )
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const article = await getArticleFromSlug(params.slug)

  return {
    props: {
      article: article,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = await getArticles()

  return {
    paths: articles.map((article) => {
      return {
        params: { slug: article.slug },
      }
    }),
    fallback: false,
  }
}

export default Article
