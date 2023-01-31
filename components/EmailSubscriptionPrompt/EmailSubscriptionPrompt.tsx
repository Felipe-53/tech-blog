import { Button, TextField } from "@mui/material"
import React, { useState } from "react"
import colors from "tailwindcss/colors"

const EmailSubscriptionPrompt: React.FC = () => {
  const [email, setEmail] = useState("")

  return (
    <div className="text-lg text-darkfont w-full text-center flex flex-col items-center mb-14">
      <div className="mb-6">
        <p>Gostou do que viu?</p>
        <p>
          Receba atualizações de conteúdo diretamente na sua caixa de entrada!
        </p>
      </div>

      <TextField
        className="max-w-sm w-full rounded-md"
        sx={{
          backgroundColor: colors.gray[700],
          mb: "1.5rem",
        }}
        color="secondary"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
      />

      <Button variant="contained" size="medium">
        Enviar
      </Button>
    </div>
  )
}

export default EmailSubscriptionPrompt
