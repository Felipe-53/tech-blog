const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo[800],
        secondary: colors.amber[400],
        darkfont: colors.gray[100],
        javascript: "#F0DB4F",
        typescript: "#007ACC",
      },

      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            // default is 65ch, modified here to match
            // the max-w-screen-md applied to the rest of the site
            maxWidth: defaultTheme.screens.md,
            a: {
              color: theme("colors.secondary"),
              textDecoration: "none",
              fontWeight: defaultTheme.fontWeight.semibold,
              "&:hover": {
                color: theme("colors.secondary"),
              },
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
