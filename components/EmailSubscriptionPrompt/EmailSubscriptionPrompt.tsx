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
    }, 100)
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
    <div className="text-lg text-darkfont w-full text-center flex flex-col items-center mb-20">
      <div className="mb-4">
        <p>
          <u>Gostou do que viu?</u>
        </p>
        <p>
          Receba atualizações de conteúdo diretamente na sua caixa de entrada!
        </p>
      </div>

      <input
        className={`max-w-md w-full rounded-md mb-3
          bg-gray-700 px-4 py-3
          hover:outline hover:outline-1  hover:outline-secondary
          focus:outline focus:outline-1
          focus:outline-secondary
        `}
        placeholder="your@email.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      <button
        onClick={sendSubscriptionRequest}
        className={`
          min-w-[30%]
          px-8 py-2 rounded-md
          focus:outline focus:outline-1 focus:outline-secondary
          ${
            !validEmail
              ? "bg-gray-700 cursor-default text-gray-500"
              : "bg-primary"
          }
        `}
      >
        {loading ? (
          <CircularProgress size="1rem" color="secondary" />
        ) : (
          "Inscrever-me"
        )}
      </button>
    </div>
  )
}

export default EmailSubscriptionPrompt
