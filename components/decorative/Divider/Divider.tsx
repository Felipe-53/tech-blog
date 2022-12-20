import React from "react"

interface DividerProps {
  color?: "primary" | "secondary"
}

const Divider: React.FC<DividerProps> = ({ color = "primary" }) => {
  const borders = {
    primary: "border-primary",
    secondary: "border-secondary",
  }

  const tailwindClassName = `block border-b-2 ${borders[color]}`

  return <span className={tailwindClassName}></span>
}

export default Divider
