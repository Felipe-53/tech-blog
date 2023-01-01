import React from "react"
import Meta from "../components/Layout/Meta/Meta"
import { proseContainerBaseTailwindClass } from "../components/containers/ProseContainer/ProseContainer"
import ContentWithSideBarWrapper from "../components/containers/ContentWithSideBarWrapper/ContentWithSideBarWrapper"
import { getPageContentFromMdFile } from "../utils/getPageContent"

const about = ({ html }: { html: string }) => {
  interface Props {}

  const AboutWrapper: React.FC<Props> = ({}) => {
    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        className={proseContainerBaseTailwindClass}
      ></div>
    )
  }

  return (
    <>
      <Meta title="Sobre" />
      <ContentWithSideBarWrapper content={<AboutWrapper />} />
    </>
  )
}

export const getStaticProps = async () => {
  const html = await getPageContentFromMdFile("about")

  return {
    props: {
      html,
    },
  }
}

export default about
