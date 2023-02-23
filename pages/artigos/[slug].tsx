import React from "react"
import { GetStaticPaths } from "next"
import { Article } from "../../types/Article"
import BlogArticle from "../../components/BlogArticle/BlogArticle"
import Meta from "../../components/Layout/Meta/Meta"
import { fetchArticle } from "../../utils/fetchJson"
import { APIResponseDTO } from "../../types/APIResponseDTO"
import { apiResponseAdapter } from "../../use-cases/adapters/apiResponseAdapter"

interface Props {
  article: Article
}

const Article: React.FC<Props> = ({ article }) => {
  const { title, excerpt, og_image_url } = article

  return (
    <>
      <Meta
        title={title}
        description={excerpt}
        ogType="article"
        ogImageUrl={og_image_url}
      />
      <BlogArticle article={article} />
    </>
  )
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const response = await fetchArticle<APIResponseDTO>(`/post/${params.slug}`)

  const article = apiResponseAdapter(response)

  return {
    props: {
      article,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetchArticle<APIResponseDTO[]>("/post")

  const articles = response.map((res) => apiResponseAdapter(res))

  return {
    paths: articles.map((techNote) => {
      return {
        params: { slug: techNote.slug },
      }
    }),
    fallback: false,
  }
}

export default Article
