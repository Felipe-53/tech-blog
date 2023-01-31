import { Button, TextField } from "@mui/material"
import React, { useState } from "react"
import colors from "tailwindcss/colors"

const EmailSubscriptionPrompt: React.FC = () => {
  const [email, setEmail] = useState("")

  return (
    <div className="text-lg text-darkfont w-full text-center flex flex-col items-center mb-14">
      <div className="mb-4">
        <p>Gostou do que viu?</p>
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
        color="secondary"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      <button
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
