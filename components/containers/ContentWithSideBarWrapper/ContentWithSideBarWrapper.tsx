import React from "react"
import SideBar from "../../SideBar/SideBar"

interface Props {
  content: React.ReactElement
}

const ContentWithSideBarWrapper: React.FC<Props> = ({ content }) => {
  return (
    <div
      className={`
      w-full
      lg:grid lg:grid-cols-4
    `}
      style={{
        // 100vw - (navbar height + footer height)
        minHeight: "calc(100vh - 6.5rem)",
      }}
    >
      <div className="col-start-1 col-end-4">{content}</div>

      <div className="col-start-4 col-end-5 h-full">
        <SideBar />
      </div>
    </div>
  )
}

export default ContentWithSideBarWrapper
