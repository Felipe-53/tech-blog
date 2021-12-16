import path from 'path'
import fs from 'fs'
import { categories } from '../articles/categories';
import { Article } from '../types/Article';

const articles: Article[] = [
  {
    id: '3',
    title: 'Como fazer deploy de um bot do Telegram com AWS Lambda',
    excerpt: 'Serveless functions (FaaS) são uma maneira de distribuir software sem gerenciar qualquer infraestrutura. Nesse artigo mostro como usar esse serviço da AWS (Lambda) para fazer o deploy de um bot no Telegram',
    created_at: '16/12/2021',
    last_updated: '',
    slug: 'como-fazer-deploy-de-um-bot-no-telegram-com-aws-lambda',
    body: '',
    categories: [],
    og_image_url: '',
    author: {
      name: 'Felipe Barbosa',
      href: '/sobre'
    }
  },
  {
    id: '2',
    title: 'Conteinerizando o ambiente de desenvolvimento com Docker - Parte 2',
    excerpt: `Nessa segunda parte, mostro na prática como conteinerizar o ambiente de desenvolvimento de uma aplicação simples que usa um banco de dados Postgres, Node.js no backend, frontend em React e Nginx como reverse-proxy`,
    created_at: '08/12/2021',
    last_updated: '',
    slug: 'conteinerizando-o-ambiente-de-desenvolvimento-com-docker-parte-2',
    body: '',
    categories: [
      categories[0],
    ],
    og_image_url: 'https://tech-blog-assets.s3.sa-east-1.amazonaws.com/schema.png',
    author: {
      name: 'Felipe Barbosa',
      href: '/sobre'
    }
  },

  {
    id: '1',
    title: 'Conteinerizando o ambiente de desenvolvimento com Docker - Parte 1',
    excerpt: `Nessa primeira de duas partes, apresento que tipo de problemas os conteiners resolvem no ambiente
    de desenvolvimento e quais benefícios se obtém através de seu uso`,
    created_at: '29/11/2021',
    last_updated: '16/12/2021',
    slug: 'conteinerizando-o-ambiente-de-desenvolvimento-com-docker-parte-1',
    body: '',
    categories: [
      categories[0],
    ],
    og_image_url: 'https://tech-blog-assets.s3.sa-east-1.amazonaws.com/docker.png',
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
