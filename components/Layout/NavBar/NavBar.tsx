import React from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import NavBarContent from './NavBarContent/NavBarContent';

interface Props {
  openMenu: boolean,
  set_openMenu: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar: React.FC<Props> = ({ openMenu, set_openMenu }) => {
  let hamBtnTailwindClassname = `
    text-3xl text-darkfont
    self-end mr-8
    lg:hidden
  `
  if (openMenu) hamBtnTailwindClassname += 'hidden';

  return (
    <nav className="w-full bg-primary h-14
      flex flex-col justify-center"
    >
      <button
        className={hamBtnTailwindClassname}
        onClick={(e) => {
          e.stopPropagation();
          set_openMenu(menu => !menu)}
        }
        onKeyDown={e => {
          if (e.key === 'Escape') {
            set_openMenu(false)
          }
        }}
      >
        <GiHamburgerMenu />
      </button>

      <NavBarContent set_openMenu={set_openMenu} isOpen={openMenu} />
    </nav>
  )
}



export default NavBar
