import type { InferGetStaticPropsType } from 'next'
import React from 'react'
import ContentWithSideBarWrapper from '../components/containers/ContentWithSideBarWrapper/ContentWithSideBarWrapper'
import HomeMain from '../components/HomeMain/HomeMain'
import { getArticles } from '../utils/articleUtils'
import { getArticleCategories } from '../utils/categoriesUtils'

const Home = ({ articles, categories }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <ContentWithSideBarWrapper content={(
      <HomeMain
        articles={articles}
        categories={categories}
      />
    )} />
  )
}

export const getStaticProps = async () => {
  const articles = await getArticles()
  const categories = await getArticleCategories()

  return {
    props: {
      articles,
      categories
    }
  } 
}

export default Home
