import "../styles/globals.css"
import "highlight.js/styles/rainbow.css"
import Layout from "../components/Layout/Layout"
import { useState } from "react"
import { Category } from "../types/Category"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { AppProps } from "next/app"
import { categories } from "../articles/categories"
import { ThemeProvider } from "@mui/material"
import { muiTheme } from "../mui-theme/theme"

const MyApp = function ({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const categoryState = useState<Category | null>(null)
  const [_, set_chosenCategory] = categoryState

  function handleRouteChange(url: string) {
    if (url === "/") return
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
    <ThemeProvider theme={muiTheme}>
      <Layout categoryState={categoryState} categories={categories}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}

export default MyApp
