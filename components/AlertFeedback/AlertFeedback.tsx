import { Alert, useMediaQuery } from "@mui/material"
import { screens } from "tailwindcss/defaultTheme"
import React from "react"

interface Props {
  success: boolean
  messages: {
    success: string
    failure: string
  }
  close: () => void
}

const AlertFeedback: React.FC<Props> = ({ success, messages, close }) => {
  const matches = useMediaQuery(`(min-width: ${screens.lg})`)
  let styles = {}
  if (matches) {
    styles = {
      left: "50%",
      transform: "translateX(-50%)",
      right: "unset",
    }
  } else {
    styles = {
      left: "1rem",
      right: "1rem",
    }
  }
  return (
    <Alert
      sx={{
        position: "fixed",
        bottom: "2rem",
        left: "1rem",
        right: "1rem",
        ...styles,
      }}
      variant="filled"
      onClose={close}
      severity={success ? "success" : "error"}
    >
      {success ? messages.success : messages.failure}
    </Alert>
  )
}

export default AlertFeedback
