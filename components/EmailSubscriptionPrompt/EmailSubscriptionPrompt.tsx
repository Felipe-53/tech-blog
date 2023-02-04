import { CircularProgress } from "@mui/material"
import React, { useEffect, useState } from "react"
import { z } from "zod"
import { EmailSubscriptionSubmission } from "../../types/EmailSubscriptionSubmission"

const baseUrl = "https://6604mo8k0f.execute-api.sa-east-1.amazonaws.com"

interface Props {
  setSuccessfulSubscriptionRequest: React.Dispatch<
    React.SetStateAction<EmailSubscriptionSubmission>
  >
}

const emailSchema = z.string().email()

const EmailSubscriptionPrompt: React.FC<Props> = ({
  setSuccessfulSubscriptionRequest,
}) => {
  const [email, setEmail] = useState("")
  const [validEmail, setValidEmail] = useState(true)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (email === "") {
        setValidEmail(true)
        return
      }
      const result = emailSchema.safeParse(email)
      result.success ? setValidEmail(true) : setValidEmail(false)
    }, 200)
  }, [email])

  async function sendSubscriptionRequest() {
    if (!validEmail) return
    if (email === "") return

    setLoading(true)

    try {
      const response = await fetch(`${baseUrl}/recipient`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      })

      switch (response.status) {
        case 201:
          setSuccessfulSubscriptionRequest("success")
          break
        case 409:
          setSuccessfulSubscriptionRequest("already-subscribed")
          break
        default:
          setSuccessfulSubscriptionRequest("failure")
      }

      setLoading(false)
    } catch {
      setLoading(false)
    }
  }

  return (
    <div
      id="inscreva-se"
      className="text-lg text-darkfont w-full text-center flex flex-col items-center mb-20 reading-padding"
    >
      <div className="mb-4">
        <p>
          <u>Gostando até aqui?</u> ✍️
        </p>
        <p>
          Receba atualizações de conteúdo diretamente na sua caixa de entrada!
        </p>
      </div>

      <div
        className="
          h-[4.5rem]
          w-full max-w-md mb-4
          flex flex-col
          gap-1
        "
      >
        <input
          className={`w-full rounded-md 
          bg-gray-700 px-4 py-3
          hover:outline hover:outline-1  hover:outline-secondary
          focus:outline focus:outline-1
          focus:outline-secondary
        `}
          type="email"
          placeholder="seu@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
        />

        {!validEmail ? (
          <span className="text-red-600 text-sm">Email inválido 😔</span>
        ) : (
          <span> </span>
        )}
      </div>

      <button
        onClick={!validEmail ? undefined : sendSubscriptionRequest}
        tabIndex={!validEmail ? -1 : 0}
        className={`
          w-40 h-10
          px-8 py-2 rounded-md
          flex justify-center items-center
          focus:outline focus:outline-1 focus:outline-secondary
          ${
            !validEmail
              ? "bg-gray-700 cursor-default text-gray-500 pointer-events-none"
              : "bg-primary"
          }
        `}
      >
        {loading ? (
          <CircularProgress thickness={5} size="1.3rem" color="inherit" />
        ) : (
          "Inscreva-se"
        )}
      </button>
    </div>
  )
}

export default EmailSubscriptionPrompt
