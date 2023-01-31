import { createTheme } from "@mui/material"
import colors from "tailwindcss/colors"

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: colors.indigo[800],
    },
    secondary: {
      main: colors.amber[400],
    },
    text: {
      primary: colors.gray[100],
    },
  },
})
