import path from 'path'
import fs from 'fs'
import { categories } from '../articles/categories';
import { Article } from '../types/Article';

const articles: Article[] = [
  {
    id: '1',
    title: 'Conteinerizando o ambiente de desenvolvimento com Docker - Parte 1',
    excerpt: `Nessa primeira de duas partes, apresento que tipo de problemas os conteiners resolvem no ambiente
    de desenvolvimento e quais benefícios se obtém através de seu uso`,
    created_at: '29/11/2021',
    last_updated: '',
    slug: 'conteinerizando-o-ambiente-de-desenvolvimento-com-docker-parte-1',
    body: '',
    categories: [
      categories[0],
    ],
    author: {
      name: 'Felipe Barbosa',
      href: '/sobre'
    }
  },
]

function getArticlesWithContent() {
  const articlesWithContent = articles.map(article => {
    const articleContent = _getArticleContent(article)
    article.body = articleContent
    return article
  })

  return articlesWithContent
}

function _getArticleContent(article: Article) {
  const { slug } = article;

  const [filteredArticle] = articles.filter(art => {
    return art.slug === slug;
  })

  if (!filteredArticle) {
    throw Error(`Article with slug ${slug} not found`)
  }

  const basePath = path.join(process.cwd(), 'articles')

  const articleContent = fs.readFileSync(path.join(basePath, `${slug}.md`)).toString('utf-8')

  return articleContent
}

export default getArticlesWithContent;
