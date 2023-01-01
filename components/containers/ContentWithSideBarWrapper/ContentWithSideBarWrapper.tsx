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
      lg:grid lg:grid-cols-10
    `}
      style={{
        // 100vw - (navbar height + footer height)
        minHeight: "calc(100vh - 6.5rem)",
      }}
    >
      <div className="col-start-1 col-end-8">{content}</div>

      <div className="col-start-8 col-end-11 h-full">
        <SideBar />
      </div>
    </div>
  )
}

export default ContentWithSideBarWrapper
