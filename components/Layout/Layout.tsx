import React, { useState } from "react"
import NavBar from "./NavBar/NavBar"
import Meta from "./Meta/Meta"
import Script from "next/script"
import SideBar from "../SideBar/SideBar"
import { Category } from "../../types/Category"
import { getArticleCategories } from "../../utils/categoriesUtils"

interface LayoutProps {
  categories?: Category[]
}

const Layout: React.FC<LayoutProps> = function Layout({
  children,
  categories,
}) {
  const [openMenu, set_openMenu] = useState(false)

  return (
    <>
      <Meta />

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=G-K6EL68YNHZ`}
      />

      <Script id="google-analytics" strategy="afterInteractive">
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
        <NavBar openMenu={openMenu} set_openMenu={set_openMenu} />

        <main className="w-full">
          <div
            className={`
            w-full
            lg:grid lg:grid-cols-10
          `}
            style={{
              // 100vw - (navbar height + footer height)
              minHeight: "calc(100vh - 6.5rem)",
            }}
          >
            <div className="col-start-1 col-end-9">{children}</div>

            <div className="col-start-9 col-end-11 h-full">
              <SideBar categories={categories} />
            </div>
          </div>
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

export async function getStaticProps() {
  const categories = await getArticleCategories()
  return {
    props: {
      categories,
    },
  }
}

export default Layout
