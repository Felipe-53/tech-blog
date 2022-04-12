import React from 'react'
import { GetStaticPaths } from 'next'
import { TechNote } from '../../types/TechNote'
import BlogArticle from '../../components/BlogArticle/BlogArticle';
import Meta from '../../components/Layout/Meta/Meta';
import fetchJson from '../../utils/fetchJson';

interface Props  {
  techNote: TechNote
}

const TechNote: React.FC<Props> = ({ techNote }) => {
  const { title, og_image_url } = techNote;

  return (
    <>
      <Meta
        title={title}
        ogImageUrl={og_image_url}
      />
      <BlogArticle article={techNote} />
   </>
  )
}

export const getStaticProps = async ({ params }: {params: {slug: string}}) => {
  const techNote = await fetchJson<TechNote>('/tech-note', {
    method: 'GET',
    queryString: {
      slug: params.slug
    }
  })

  return {
    props: {
      techNote: techNote
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const techNotes = await fetchJson<TechNote[]>('/tech-notes')

  return {
    paths: techNotes.map(techNote => {
      return {
        params: { slug: techNote.slug }
      }
    }),
    fallback: false
  }
}

export default TechNote
