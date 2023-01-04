import React from "react"
import Meta from "../components/Layout/Meta/Meta"
import { proseContainerBaseTailwindClass } from "../components/containers/ProseContainer/ProseContainer"
import { getPageContentFromMdFile } from "../utils/getPageContent"

interface ProjectsWrapperProps {
  html: string
}

interface ProjectsProps {
  html: string
}

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = ({ html }) => {
  return (
    <>
      <Meta title="Projetos" />
      <div
        className={proseContainerBaseTailwindClass}
        dangerouslySetInnerHTML={{ __html: html }}
      ></div>
    </>
  )
}

const projetos: React.FC<ProjectsProps> = ({ html }) => {
  return <ProjectsWrapper html={html} />
}

export const getStaticProps = async () => {
  const html = await getPageContentFromMdFile("projects")

  return {
    props: {
      html,
    },
  }
}

export default projetos
