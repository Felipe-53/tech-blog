import path from "path"
import fs from "fs"
import { categories } from "../articles/categories"
import { Article } from "../types/Article"

const articles: Article[] = [
  {
    id: "7",
    title:
      "Minha primeira tentativa de contrivuição para a comunidade open source - Parte 1",
    excerpt: `É incrível a quantidade de ferramentas das quais nós dependemos que são construídas em código aberto pela comunidade.\nAcompanhe o desenrolar da minha primeira tentativa de contribuição! 😅`,
    created_at: "09/01/2023",
    last_updated: "09/01/2023",
    slug: "minha-primeira-tentativa-de-contribuicao-para-a-comunidade-open-source-parte-1",
    body: "",
    categories: [categories[7]],
    og_image_url:
      "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/tech-notes-assets/list-image.jpg",
    author: {
      name: "Felipe Barbosa",
      href: "/sobre",
    },
  },
  {
    id: "6",
    title: "Minha lista de Tecnologias para 2023",
    excerpt:
      "Quais tecnologias estão na sua mira em 2023? 🤔\nResolvi trazer minha lista de ferramentas, estudos, abordagens e conceitos sobre os quais pretendo me debruçar em 2023 - e por que eu acho que cada uma faz sentido",
    created_at: "01/01/2023",
    last_updated: "01/01/2023",
    slug: "minha-lista-de-tecnologias-para-2023",
    body: "",
    categories: [categories[7]],
    og_image_url:
      "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/tech-notes-assets/list-image.jpg",
    author: {
      name: "Felipe Barbosa",
      href: "/sobre",
    },
  },
  {
    id: "5",
    title: "Um Panorama do ESM no Node.js",
    excerpt:
      "ESM (ECMAScript Modules) é a maneira oficial normatizada de trabalhar com módulos no JavaScript. Nesse artigo, discuto um pouco da história do ESM no Node.js, como habilitá-lo no runtime, quais as implicações disso e o que esperar para o futuro",
    created_at: "23/05/2022",
    last_updated: "23/05/2022",
    slug: "um-panorama-do-esm-no-nodejs",
    body: "",
    categories: [categories[6]],
    og_image_url:
      "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/articles-assets/node.jpg",
    author: {
      name: "Felipe Barbosa",
      href: "/sobre",
    },
  },
  {
    id: "4",
    title: "Database Transactions",
    excerpt:
      "Transações são uma funcionalidade que torna o armazenamento e manipulação de dados em um banco SQL robusto e confiável - e ao mesmo tempo em que é essencial, trata-se também de um conceito bastante simples de ser entendido",
    created_at: "17/04/2022",
    last_updated: "17/04/2022",
    slug: "database-transactions",
    body: "",
    categories: [categories[5]],
    og_image_url:
      "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/articles-assets/database-transactions.jpg",
    author: {
      name: "Felipe Barbosa",
      href: "/sobre",
    },
  },
  {
    id: "3",
    title: "Como fazer deploy de um bot do Telegram com AWS Lambda",
    excerpt:
      "Serveless functions (FaaS) são uma maneira de distribuir software sem gerenciar qualquer infraestrutura. Nesse artigo mostro como usar o AWS Lambda para fazer o deploy de um bot no Telegram usando Node.js e TypeScript com custo zero 😱",
    created_at: "16/12/2021",
    last_updated: "",
    slug: "como-fazer-deploy-de-um-bot-no-telegram-com-aws-lambda",
    body: "",
    categories: [categories[2], categories[3], categories[4]],
    og_image_url:
      "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/telegram-bot-article.jpg",
    author: {
      name: "Felipe Barbosa",
      href: "/sobre",
    },
  },
  {
    id: "2",
    title: "Conteinerizando o ambiente de desenvolvimento com Docker - Parte 2",
    excerpt: `Nessa segunda parte, mostro na prática como conteinerizar o ambiente de desenvolvimento de uma aplicação simples que usa um banco de dados Postgres, Node.js no backend, frontend em React e Nginx como reverse-proxy`,
    created_at: "08/12/2021",
    last_updated: "",
    slug: "conteinerizando-o-ambiente-de-desenvolvimento-com-docker-parte-2",
    body: "",
    categories: [categories[0]],
    og_image_url:
      "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/schema.png",
    author: {
      name: "Felipe Barbosa",
      href: "/sobre",
    },
  },

  {
    id: "1",
    title: "Conteinerizando o ambiente de desenvolvimento com Docker - Parte 1",
    excerpt: `Nessa primeira de duas partes, apresento que tipo de problemas os conteiners resolvem no ambiente
    de desenvolvimento e quais benefícios se obtém através de seu uso`,
    created_at: "29/11/2021",
    last_updated: "16/12/2021",
    slug: "conteinerizando-o-ambiente-de-desenvolvimento-com-docker-parte-1",
    body: "",
    categories: [categories[0]],
    og_image_url:
      "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/docker.png",
    author: {
      name: "Felipe Barbosa",
      href: "/sobre",
    },
  },
]

function getArticlesWithContent() {
  const articlesWithContent = articles.map((article) => {
    const articleContent = _getArticleContent(article)
    article.body = articleContent
    return article
  })

  return articlesWithContent
}

function _getArticleContent(article: Article) {
  const { slug } = article

  const [filteredArticle] = articles.filter((art) => {
    return art.slug === slug
  })

  if (!filteredArticle) {
    throw Error(`Article with slug ${slug} not found`)
  }

  const basePath = path.join(process.cwd(), "articles")

  const articleContent = fs
    .readFileSync(path.join(basePath, `${slug}.md`))
    .toString("utf-8")

  return articleContent
}

export default getArticlesWithContent
