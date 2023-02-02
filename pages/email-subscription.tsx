import { Button, CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { mainScreenPositioningStyles } from "../components/HomeMain/HomeMain"

type EmailConfirmedState = "loading" | "success" | "failure"

const baseUrl = "https://6604mo8k0f.execute-api.sa-east-1.amazonaws.com"

const EmailSubscription: React.FC = () => {
  const [emailConfirmed, setEmailConfirmed] =
    useState<EmailConfirmedState>("loading")

  useEffect(() => {
    const params = new URL(document.location.href).searchParams
    const recipientId = params.get("id")

    ;(async () => {
      if (!recipientId) {
        setEmailConfirmed("failure")
        return
      }
      try {
        const response = await fetch(
          `${baseUrl}/recipient/${recipientId}/status`,
          {
            method: "PATCH",
          }
        )

        if (response.status !== 200) {
          setEmailConfirmed("failure")
          return
        }

        setEmailConfirmed("success")
      } catch (err) {
        console.log(err)
        setEmailConfirmed("failure")
      }
    })()
  }, [])

  const mapping = {
    loading: <Loading />,
    success: <Success />,
    failure: <Failure />,
  }
  return (
    <div
      className={`
      ${mainScreenPositioningStyles}
      h-[50rem]
      text-lg text-darkfont
    `}
    >
      <div className="w-full h-full flex flex-col gap-8 items-center mt-24">
        {mapping[emailConfirmed]}
      </div>
    </div>
  )
}

const Loading: React.FC = function () {
  return (
    <>
      Confirmando seu email...
      <CircularProgress size={"5rem"} thickness={2} />
    </>
  )
}

const Success: React.FC = function () {
  return (
    <>
      Seu email foi confirmado!
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        width="5rem"
        height="5rem"
      >
        <path
          d="M32,2C15.431,2,2,15.432,2,32c0,16.568,13.432,30,30,30c16.568,0,30-13.432,30-30C62,15.432,48.568,2,32,2z M25.025,50
	l-0.02-0.02L24.988,50L11,35.6l7.029-7.164l6.977,7.184l21-21.619L53,21.199L25.025,50z"
          fill="#43a047"
        />
      </svg>
      <p>Obrigado por se inscrever! </p>
    </>
  )
}

const Failure: React.FC = function () {
  return (
    <>
      Ops, algo de errado não está certo!
      <svg
        fill="#dc2626"
        width="5rem"
        height="5rem"
        viewBox="0 -0.5 17 17"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M15.35 8c0 3.377-2.945 6.25-6.75 6.25S1.85 11.377 1.85 8 4.795 1.75 8.6 1.75 15.35 4.623 15.35 8zm1.25 0c0 4.142-3.582 7.5-8 7.5S.6 12.142.6 8C.6 3.858 4.182.5 8.6.5s8 3.358 8 7.5zM9.229 3.101l-.014 7.3-1.25-.002.014-7.3 1.25.002zm.016 9.249a.65.65 0 1 0-1.3 0 .65.65 0 0 0 1.3 0z"
        />
      </svg>
      Não foi possível confirmar seu email... 😔
    </>
  )
}

export default EmailSubscription
