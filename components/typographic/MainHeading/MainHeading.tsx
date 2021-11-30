import React from 'react'

interface Props {
  className?: string
}

const MainHeading: React.FC<Props> = ({ className, children }) => {
  let tailwindClassname = 'text-3xl font-bold text-darkfont'

  if (className) {
    tailwindClassname += ' ' + className;
  }

  return (
    <h2 className={tailwindClassname}>
      {children}
    </h2>
  )
}

export default MainHeading
