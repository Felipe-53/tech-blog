import React from 'react'

interface Props {
  className?: string,
  positioningClasses?: string
}

export const proseContainerBaseTailwindClass = 'w-full reading-padding prose prose-lg prose-dark mx-auto my-8';

const ProseContainer: React.FC<Props> = ({ children, className: inputClassname, positioningClasses }) => {
  let className = proseContainerBaseTailwindClass;
  
  if (inputClassname) {
    className += ' ' + inputClassname;
  }

  if (positioningClasses) {
    className += ' ' + positioningClasses;
  }

  return (
    <div className={className}>
      {children}
    </div>
  )
}

export default ProseContainer
