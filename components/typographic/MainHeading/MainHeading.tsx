import React from "react"

interface Props {
  className?: string
  id?: string
}

const MainHeading: React.FC<Props> = ({ id, className, children }) => {
  let tailwindClassname = "text-3xl font-bold text-darkfont"

  if (className) {
    tailwindClassname += " " + className
  }

  return (
    <h2 id={id} className={tailwindClassname}>
      {children}
    </h2>
  )
}

export default MainHeading
