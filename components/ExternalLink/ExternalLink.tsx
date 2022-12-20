import React from "react"

interface Props {
  href: string
}

const ExternalLink: React.FC<Props> = ({ href, children }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="text-darkfont hover:text-secondary active:text-secondary focus:text-secondary font-bold text-lg"
    >
      {children}
    </a>
  )
}

export default ExternalLink
