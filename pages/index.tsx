import type { InferGetStaticPropsType } from 'next'
import React from 'react'
import ContentWithSideBarWrapper from '../components/containers/ContentWithSideBarWrapper/ContentWithSideBarWrapper'
import HomeMain from '../components/HomeMain/HomeMain'
import Meta from '../components/Layout/Meta/Meta'
import { APIResponseDTO } from '../types/APIResponseDTO'
import { TechNote } from '../types/TechNote'
import { TechNoteCategory } from '../types/TechNoteCategory'
import { apiResponseAdapter } from '../use-cases/adapters/apiResponseAdapter'
import { getArticles } from '../utils/articleUtils'
import { getArticleCategories } from '../utils/categoriesUtils'
import fetchJson from '../utils/fetchJson'

const Home = ({ articles, categories, techNotes }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Meta
        ogType="website"
        ogImageUrl="https://tech-blog-assets.s3.sa-east-1.amazonaws.com/js-ts-ok.png"
      />
      <ContentWithSideBarWrapper content={(
        <HomeMain
          articles={articles}
          categories={categories}
          techNotes={techNotes}
        />
      )} />
    </>
  )
}

export const getStaticProps = async () => {
  const baseUrl = process.env.API_URL
  if (!baseUrl) throw new Error('env API_URL not defined')

  const response = await fetchJson<APIResponseDTO[]>('/post')
  const techNotes = response.map(res => apiResponseAdapter(res))

  const articles = await getArticles()
  const categories = await getArticleCategories()

  return {
    props: {
      articles,
      categories,
      techNotes
    }
  } 
}

export default Home
