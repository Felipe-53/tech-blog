import type { InferGetStaticPropsType } from "next"
import React from "react"
import HomeMain from "../components/HomeMain/HomeMain"
import Meta from "../components/Layout/Meta/Meta"
import { APIResponseDTO } from "../types/APIResponseDTO"
import { Category } from "../types/Category"
import { apiResponseAdapter } from "../use-cases/adapters/apiResponseAdapter"
import { getArticles } from "../utils/articleUtils"
import { getArticleCategories } from "../utils/categoriesUtils"
import fetchJson from "../utils/fetchJson"

interface HomeProps extends InferGetStaticPropsType<typeof getStaticProps> {
  categoryState: [
    Category | null,
    React.Dispatch<React.SetStateAction<Category | null>>
  ]
}

const Home = ({
  articles,
  categories,
  techNotes,
  categoryState,
}: HomeProps) => {
  return (
    <>
      <Meta
        ogType="website"
        ogImageUrl="https://tech-blog-assets.s3.sa-east-1.amazonaws.com/js-ts-ok.png"
      />
      <HomeMain
        categoryState={categoryState}
        articles={articles}
        categories={categories}
        techNotes={techNotes}
      />
    </>
  )
}

export const getStaticProps = async () => {
  const baseUrl = process.env.API_URL
  if (!baseUrl) throw new Error("env API_URL not defined")

  const response = await fetchJson<APIResponseDTO[]>("/post")
  const techNotes = response
    .map((res) => apiResponseAdapter(res))
    .sort((a, b) => {
      if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
        return -1
      }
      return 1
    })

  const articles = await getArticles()
  const categories = await getArticleCategories()

  return {
    props: {
      articles,
      categories,
      techNotes,
    },
  }
}

export default Home
