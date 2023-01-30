import React, { useEffect, useState } from "react"
import { env } from "../utils/env"
import { makeFetchJson } from "../utils/fetchJson"
const fetchJson = makeFetchJson(env.recipientApiUrl, env.recipientApiToken)

type EmailConfirmedState = "loading" | "success" | "failure"

const EmailSubscription: React.FC = () => {
  const [emailConfirmed, setEmailConfirmed] =
    useState<EmailConfirmedState>("loading")

  const params = new URL(document.location.href).searchParams
  const recipientId = params.get("id")

  useEffect(() => {
    ;(async () => {
      if (!recipientId) {
        setEmailConfirmed("failure")
        return
      }
      try {
        await fetchJson(`/recipient/${recipientId}/status`, {
          method: "PATCH",
        })
        setEmailConfirmed("success")
      } catch (err) {
        console.log(err)
        setEmailConfirmed("failure")
      }
    })()
  }, [])

  const mapping = {
    loading: <>Carregando</>,
    failure: <>Houve um problema, tente novamente</>,
    success: <>Seu e-mail foi confirmado!</>,
  }
  return (
    <div className="flex items-center justify-center">
      {mapping[emailConfirmed]}
    </div>
  )
}

export default EmailSubscription
