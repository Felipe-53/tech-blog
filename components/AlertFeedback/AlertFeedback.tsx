import { Alert, AlertColor, useMediaQuery } from "@mui/material"
import { screens } from "tailwindcss/defaultTheme"
import React from "react"

interface Props {
  currentState: string
  states: {
    state: string
    message: string
    severity: AlertColor
  }[]
  close: () => void
}

const AlertFeedback: React.FC<Props> = ({ currentState, states, close }) => {
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
      left: "1.5rem",
      right: "1.5rem",
    }
  }

  const render = states.find((msg) => {
    return msg.state === currentState
  })

  if (!render) return null

  return (
    <Alert
      sx={{
        position: "fixed",
        top: "0.5rem",
        ...styles,
      }}
      variant="filled"
      onClose={close}
      severity={render.severity}
    >
      {render.message}
    </Alert>
  )
}

export default AlertFeedback
