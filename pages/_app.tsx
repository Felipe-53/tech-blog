import "../styles/globals.css"
import "highlight.js/styles/rainbow.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout/Layout"
import { getArticleCategories } from "../utils/categoriesUtils"
import { useState } from "react"
import { Category } from "../types/Category"

const categories = await getArticleCategories()

function MyApp({ Component, pageProps }: AppProps) {
  const categoryState = useState<Category | null>(null)

  pageProps = {
    ...pageProps,
    categoryState,
  }

  return (
    <Layout categoryState={categoryState} categories={categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
