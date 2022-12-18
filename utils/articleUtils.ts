import getArticlesWithContent from "../articles/articles"

async function getArticles() {
  const articles = getArticlesWithContent()
  return articles
}

async function getArticleFromSlug(slug: string) {
  const articles = getArticlesWithContent()

  const [filteredArticle] = articles.filter((art) => {
    return art.slug === slug
  })

  if (!filteredArticle) {
    throw Error(`Article with slug ${slug} not found`)
  }

  return filteredArticle
}

export { getArticles, getArticleFromSlug }
