import React from "react"
import Link from "next/link"

interface Props {
  isOpen: boolean
  set_openMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBarContent: React.FC<Props> = ({ isOpen, set_openMenu }) => {
  /* To animate the transition, add 'transition-transform'
  at the end of the string. The problem is that it introduces
  a small layout bug when changing from lg to smaller screen size. */
  let tailwindClassname = `
    transform text-lg text-darkfont
    lg:pt-0
    lg:translate-x-0 lg:transition-none
    lg:visible
    lg:bg-primary lg:static
    lg:gap-14 lg:h-14 lg:flex-row lg:flex lg:items-center
    lg:ml-4

    flex fixed right-0 top-0 bottom-0 left-1/2
    flex-col items-center gap-8
    bg-gray-600 pt-14
    backdrop-blur bg-opacity-70
    translate-x-full
  `

  if (isOpen) {
    tailwindClassname = tailwindClassname.replace("translate-x-full", "")
  }

  const onClickHandler: React.MouseEventHandler<HTMLAnchorElement> = (e) => {
    set_openMenu(false)
  }

  return (
    <ul onClick={(e) => e.stopPropagation()} className={tailwindClassname}>
      <NavBarLink onClick={onClickHandler} href="/">
        Principal
      </NavBarLink>
      <NavBarLink onClick={onClickHandler} href="/sobre">
        Sobre
      </NavBarLink>
      <NavBarLink onClick={onClickHandler} href="/projetos">
        Projetos
      </NavBarLink>
      <NavBarLink onClick={onClickHandler} href="/sobre#me-encontre">
        Contato
      </NavBarLink>
    </ul>
  )
}

const NavBarLink: React.FC<{
  href: string
  onClick: React.MouseEventHandler<HTMLAnchorElement>
}> = ({ href, children, onClick }) => {
  return (
    <li>
      <Link href={href} onClick={onClick} className="text-lg hover:text-secondary">

        {children}

      </Link>
    </li>
  );
}

export default NavBarContent
