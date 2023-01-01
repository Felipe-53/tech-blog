import React from "react"

interface Props {
  className?: string
}

export const proseContainerBaseTailwindClass =
  "w-full reading-padding text-slate-100 prose prose-lg prose-invert mx-auto my-8"

const ProseContainer: React.FC<Props> = ({
  children,
  className: inputClassname,
}) => {
  let className = proseContainerBaseTailwindClass

  if (inputClassname) {
    className += " " + inputClassname
  }

  return <div className={className}>{children}</div>
}

export default ProseContainer
