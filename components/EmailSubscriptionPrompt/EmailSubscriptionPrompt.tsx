import React, { useEffect, useState } from "react"

const baseUrl = "https://37q7kaizzb.execute-api.sa-east-1.amazonaws.com"

interface Props {
  setSuccessfulSubscriptionRequest: React.Dispatch<
    React.SetStateAction<boolean | null>
  >
}

const EmailSubscriptionPrompt: React.FC<Props> = ({
  setSuccessfulSubscriptionRequest,
}) => {
  const [email, setEmail] = useState("")

  async function sendSubscriptionRequest() {
    try {
      const response = await fetch(`${baseUrl}/recipient`, {
        method: "POST",
        body: JSON.stringify({
          email,
        }),
      })

      if (response.status !== 201) {
        console.log(await response.json())
        throw Error("Failed to create recipient")
      }

      setSuccessfulSubscriptionRequest(true)
    } catch {
      setSuccessfulSubscriptionRequest(false)
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
        className="max-w-sm w-full rounded-md mb-3
          bg-gray-700 px-4 py-3
          hover:outline hover:outline-1  hover:outline-secondary
          focus:outline focus:outline-1
          focus:outline-secondary

        "
        placeholder="your@email.com"
        color="secondary"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      <button
        onClick={sendSubscriptionRequest}
        className="
      bg-primary px-8 py-2 rounded-md
      focus:outline focus:outline-1 focus:outline-secondary
      "
      >
        Inscrever-me
      </button>
    </div>
  )
}

export default EmailSubscriptionPrompt
