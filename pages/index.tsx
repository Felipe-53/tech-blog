import type { InferGetStaticPropsType } from "next"
import React from "react"
import HomeMain from "../components/HomeMain/HomeMain"
import { APIResponseDTO } from "../types/APIResponseDTO"
import { Category } from "../types/Category"
import { apiResponseAdapter } from "../use-cases/adapters/apiResponseAdapter"
import { fetchFromArticleApi, fetchFromTechNoteApi } from "../utils/fetchJson"

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
  const techNotesresponse = await fetchFromTechNoteApi<APIResponseDTO[]>(
    "/post"
  )
  const techNotes = techNotesresponse
    .map((res) => apiResponseAdapter(res))
    .sort((a, b) => {
      if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
        return -1
      }
      return 1
    })

  const articlesResponse = await fetchFromArticleApi<APIResponseDTO[]>("/post")
  const articles = articlesResponse
    .map((res) => apiResponseAdapter(res))
    .sort((a, b) => {
      if (Date.parse(a.created_at) > Date.parse(b.created_at)) {
        return -1
      }
      return 1
    })

  const categories = await fetchFromArticleApi<{ id: string; name: string }[]>(
    "/category"
  )

  return {
    props: {
      articles,
      categories,
      techNotes,
    },
  }
}

export default Home
