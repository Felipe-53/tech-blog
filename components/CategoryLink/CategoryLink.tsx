import React from "react"
import Link, { LinkProps } from "next/link"

interface SiteLinkProsp extends LinkProps {
  className?: string
}

export const CategoryLink: React.FC<SiteLinkProsp> = (props) => {
  const { children, className } = props

  const properties = {
    ...props,
    className: `text-darkfont hover:text-secondary ${
      className ? className : ""
    }`,
  }

  return <Link {...properties}>🏷️ {children}</Link>
}
