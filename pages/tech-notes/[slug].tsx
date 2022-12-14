import React from 'react'
import { GetStaticPaths } from 'next'
import { TechNote } from '../../types/TechNote'
import BlogArticle from '../../components/BlogArticle/BlogArticle';
import Meta from '../../components/Layout/Meta/Meta';
import fetchJson from '../../utils/fetchJson';
import { APIResponseDTO } from '../../types/APIResponseDTO';
import { apiResponseAdapter } from '../../use-cases/adapters/apiResponseAdapter';

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
  const response = await fetchJson<APIResponseDTO>(`/post/${params.slug}`)

  const techNote = apiResponseAdapter(response)

  return {
    props: {
      techNote: techNote
    }
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetchJson<APIResponseDTO[]>('/post')

  const techNotes = response.map(res => apiResponseAdapter(res))

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
