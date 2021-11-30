import React from 'react'
import SideBar from '../../SideBar/SideBar'

interface Props {
  content: React.ReactElement
}

const ContentWithSideBarWrapper: React.FC<Props> = ({ content }) => {
  const enhancedComponent = React.cloneElement(content, {
    positioningClasses: 'col-start-1 col-end-5'
  })

  return (
    <div className={`
      flex flex-col w-full
      lg:grid lg:grid-cols-5
    `}
      style={{
        // 100vw - (navbar height + footer height)
        minHeight: 'calc(100vh - 6.5rem)'
      }}
    >
      {enhancedComponent}
      <SideBar />
    </div>
  )
}

export default ContentWithSideBarWrapper
