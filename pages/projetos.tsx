import React from 'react'
import Meta from '../components/Layout/Meta/Meta'
import ContentWithSideBarWrapper from '../components/containers/ContentWithSideBarWrapper/ContentWithSideBarWrapper'
import { proseContainerBaseTailwindClass } from '../components/containers/ProseContainer/ProseContainer'
import { getPageContentFromMdFile } from '../utils/getPageContent'

interface ProjectsWrapperProps {
  html: string,
  positioningClasses?: string
}

interface ProjectsProps {
  html: string
}

const ProjectsWrapper: React.FC<ProjectsWrapperProps> = ({ html, positioningClasses }) => {
  let className;
  if (positioningClasses) {
    className = proseContainerBaseTailwindClass + ' ' + positioningClasses;
  } else {
    className = proseContainerBaseTailwindClass;
  }

  return (
    <>
      <Meta title="Projetos" />
      <div
        className={className}
        dangerouslySetInnerHTML={{__html: html}}
      >
      </div>
    </>
  )
}

const projetos: React.FC<ProjectsProps> = ({ html }) => {
  return (
    <ContentWithSideBarWrapper content={(
      <ProjectsWrapper html={html} />
    )}
    />
  )
}

export const getStaticProps = async () => {
  const html = await getPageContentFromMdFile('projects')

  return {
    props: {
      html,
    }
  }
}

export default projetos
