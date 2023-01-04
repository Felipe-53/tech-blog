import React from "react"

interface Props {
  className?: string
}

const SmallHeading: React.FC<Props> = ({ className, children }) => {
  let tailwindClassname = "text-darkfont text-xl font-semibold"

  if (className) {
    tailwindClassname += " " + className
  }

  return <h4 className={tailwindClassname}>{children}</h4>
}

export default SmallHeading
