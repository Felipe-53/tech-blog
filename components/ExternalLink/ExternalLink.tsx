import React from 'react'

interface Props {
  href: string,
}

const ExternalLink: React.FC<Props> = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-darkfont text-lg hover:text-secondary"
    >
      {children}
    </a>
  )
}

export default ExternalLink
