import "../styles/globals.css"
import "highlight.js/styles/rainbow.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout/Layout"
import { getArticleCategories } from "../utils/categoriesUtils"

const categories = await getArticleCategories()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout categories={categories}>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
