import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import Meta from './Meta/Meta'

const Layout: React.FC = function Layout({ children }) {
  const [openMenu, set_openMenu] = useState(false);

  return (
    <>
      <Meta />
      <div
        className="flex flex-col min-h-screen bg-gray-800"
        onClick={() => set_openMenu(false)}
      >
        <NavBar
          openMenu={openMenu}
          set_openMenu={set_openMenu}
        />

        <main className="w-full">
          {children}
        </main>

        <footer className="mt-auto text-darkfont bg-primary">
          <div className="flex items-center justify-evenly h-12">
            <p className="text-lg">Made with ❤️ by Felipe Barbosa</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Layout
