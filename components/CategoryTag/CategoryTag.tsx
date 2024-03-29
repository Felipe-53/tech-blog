import React from "react"

const CategoryTag: React.FC = ({ children }) => {
  return (
    <span className="bg-primary rounded-md py-1 px-2 text-darkfont">
      {children}
    </span>
  )
}

export default CategoryTag
