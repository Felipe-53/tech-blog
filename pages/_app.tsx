import "../styles/globals.css"
import "highlight.js/styles/rainbow.css"
import type { AppProps } from "next/app"
import Layout from "../components/Layout/Layout"
import { getArticleCategories } from "../utils/categoriesUtils"
import { useState } from "react"
import { Category } from "../types/Category"
import { useRouter } from "next/router"
import { useEffect } from "react"

const categories = await getArticleCategories()

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const categoryState = useState<Category | null>(null)
  const [_, set_chosenCategory] = categoryState

  function handleRouteChange() {
    set_chosenCategory(null)
  }

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  })

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
