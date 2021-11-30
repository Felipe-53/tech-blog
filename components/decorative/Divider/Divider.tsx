import React from 'react'

const Divider: React.FC = () => {
  const tailwindClassName = 'block border-b-2 border-primary';

  return (
    <span className={tailwindClassName}></span>
  )
}

export default Divider
