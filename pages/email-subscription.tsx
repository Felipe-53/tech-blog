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
        height="5rem"
        width="5rem"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
      >
        <g>
          <path
            fill="#FA5255"
            d="M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M12,19.66
		c-0.938,0-1.58-0.723-1.58-1.66c0-0.964,0.669-1.66,1.58-1.66c0.963,0,1.58,0.696,1.58,1.66C13.58,18.938,12.963,19.66,12,19.66z
		 M12.622,13.321c-0.239,0.815-0.992,0.829-1.243,0c-0.289-0.956-1.316-4.585-1.316-6.942c0-3.11,3.891-3.125,3.891,0
		C13.953,8.75,12.871,12.473,12.622,13.321z"
          />
        </g>
      </svg>
      Não foi possível confirmar seu email... 😔
    </>
  )
}

export default EmailSubscription
