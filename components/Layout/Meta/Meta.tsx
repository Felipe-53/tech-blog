import React from 'react'
import Head from 'next/head'

interface Props {
  title?: string,
  keywords?: string,
  description?: string
  ogImageUrl?: string
  ogType?: string
}

const Meta: React.FC<Props> = ({ title, description, keywords, ogImageUrl, ogType }) => {
  const indexTitle = 'Felipe Barbosa'

  if (title) {
    title += ' | Felipe Barbosa'
  } else {
    title = indexTitle
  }

  return (
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="keywords"
        content={keywords}
      />
      {
        ogImageUrl?
        <meta
          name="image"
          property="og:image"
          content={ogImageUrl}
        /> 
        : null
      }
      {
        ogType?
        <meta
          property="og:type"
          content={ogType}
        /> : null
      }
      <link rel="icon" href="/favicon.ico" />
      <title>{title}</title>
    </Head>
  )
}

Meta.defaultProps = {
  keywords: 'desenvolvimento web, javascript, typescript, node.js, react, programação',
  description: 'Site pessoal e blog sobre desenvolvimento Full Stack com JavaScript, TypeScript e todas as tecnologias fantásticas produzidas nesse ecossistema'
}

export default Meta
