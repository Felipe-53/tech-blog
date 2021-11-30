import React from 'react'

interface Props {
  className?: string
}

const MediumHeading: React.FC<Props> = ({ className, children }) => {
  let tailwindClassname = 'text-darkfont text-2xl font-semibold'

  if (className) {
    tailwindClassname += ' ' + className;
  }

  return (
    <h3 className={tailwindClassname}>
      {children}
    </h3>
  )
}

export default MediumHeading
