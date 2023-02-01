import React from "react"

interface DividerProps {
  color?: "primary" | "secondary" | "darkfont" | "gray"
  className?: string
  thickness?: 1 | 2
}

const Divider: React.FC<DividerProps> = ({
  className,
  color = "primary",
  thickness = 2,
}) => {
  const borders = {
    primary: "border-primary",
    secondary: "border-secondary",
    darkfont: "border-darkfont",
    gray: "border-gray-500",
  }

  const sizes = {
    1: "border-b-[1px]",
    2: "border-b-2",
  }

  const tailwindClassName = `block w-full ${sizes[thickness]} ${borders[color]}`

  let finalClassName = tailwindClassName
  if (className) {
    finalClassName += " " + className
  }

  return <span className={finalClassName}></span>
}

export default Divider
