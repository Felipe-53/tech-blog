import React, { useContext, useEffect, useState } from "react"
import NavBar from "./NavBar/NavBar"
import Meta from "./Meta/Meta"
import Script from "next/script"
import SideBar from "../SideBar/SideBar"
import { Category } from "../../types/Category"
import Footer from "./Footer/Footer"
import { AppContext } from "../../pages/_app"
import AlertFeedback from "../AlertFeedback/AlertFeedback"
import { emailSubscriptionSubmissionState } from "../../types/EmailSubscriptionSubmission"

interface LayoutProps {
  categories: Category[]
  categoryState: [
    Category | null,
    React.Dispatch<React.SetStateAction<Category | null>>
  ]
}

const Layout: React.FC<LayoutProps> = function Layout({
  children,
  categories,
  categoryState,
}) {
  const [openMenu, set_openMenu] = useState(false)
  const appContext = useContext(AppContext)
  const [successfulEmailSubscription, setSuccessfulEmailSubscription] =
    appContext!.successfulEmailSubscriptionState

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
              <SideBar categoryState={categoryState} categories={categories} />
            </div>
          </div>
        </main>

        {successfulEmailSubscription !== null ? (
          <AlertFeedback
            close={() => setSuccessfulEmailSubscription(null)}
            currentState={successfulEmailSubscription}
            states={[
              {
                severity: "success",
                message:
                  "Sucesso! Confira sua caixa de entrega para confirmar a inscrição",
                state: emailSubscriptionSubmissionState.success,
              },
              {
                severity: "warning",
                message:
                  "Sua inscrição já foi feita! Confira sua caixa de entrada para confirmar. Caso já tenha confirmado, ignore",
                state: emailSubscriptionSubmissionState.alreadySubscribed,
              },
              {
                severity: "error",
                message: "Algo deu errado! Por favor, tente novamente",
                state: emailSubscriptionSubmissionState.failure,
              },
            ]}
          />
        ) : null}

        <Footer />
      </div>
    </>
  )
}

export default Layout
