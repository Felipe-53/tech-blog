import React, { useState } from 'react'
import NavBar from './NavBar/NavBar'
import Meta from './Meta/Meta'
import Script from 'next/script'

const Layout: React.FC = function Layout({ children }) {
  const [openMenu, set_openMenu] = useState(false);

  return (
    <>
      <Meta />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-K6EL68YNHZ`}
      />

      <Script
        id="google-analytics"
        strategy="afterInteractive"
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-K6EL68YNHZ');
        `}
      </Script>

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
