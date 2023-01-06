import React from "react"
import Head from "next/head"

interface Props {
  title?: string
  keywords?: string
  description?: string
  ogImageUrl?: string
  ogType?: string
}

const defaultProps = {
  keywords:
    "desenvolvimento web, javascript, typescript, node.js, react, programação",
  description:
    "Site pessoal e blog sobre desenvolvimento Full Stack com JavaScript, TypeScript e todas as tecnologias fantásticas produzidas nesse ecossistema",
  ogType: "website",
  ogImageUrl:
    "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/js-ts-ok.png",
}

const Meta: React.FC<Props> = ({
  title,
  description = defaultProps.description,
  keywords = defaultProps.keywords,
  ogImageUrl = defaultProps.ogImageUrl,
  ogType = defaultProps.ogType,
}) => {
  const indexTitle = "Felipe Barbosa"

  if (title) {
    title += " | Felipe Barbosa"
  } else {
    title = indexTitle
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta key="og:type" property="og:type" content={ogType} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={ogImageUrl} />

      <link key="favicon" rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  keywords:
    "desenvolvimento web, javascript, typescript, node.js, react, programação",
  description:
    "Site pessoal e blog sobre desenvolvimento Full Stack com JavaScript, TypeScript e todas as tecnologias fantásticas produzidas nesse ecossistema",
  ogType: "website",
  ogImageUrl:
    "https://tech-blog-assets.s3.sa-east-1.amazonaws.com/js-ts-ok.png",
}

export default Meta
