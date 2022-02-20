import type { InferGetStaticPropsType } from 'next'
import React from 'react'
import ContentWithSideBarWrapper from '../components/containers/ContentWithSideBarWrapper/ContentWithSideBarWrapper'
import HomeMain from '../components/HomeMain/HomeMain'
import Meta from '../components/Layout/Meta/Meta'
import { TechNote } from '../types/TechNote'
import { TechNoteCategory } from '../types/TechNoteCategory'
import { getArticles } from '../utils/articleUtils'
import { getArticleCategories } from '../utils/categoriesUtils'

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

  let response = await fetch(`${baseUrl}/tech-notes`)
  const techNotes: TechNote[] = await response.json()

  response = await fetch(`${baseUrl}/tech-notes`)
  const techNotesCategories: TechNoteCategory = await response.json()

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
