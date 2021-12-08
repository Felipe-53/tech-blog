module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#4F46E5',
        'secondary': '#EC4899',
        'darkfont': '#F3F4F6',
        'javascript': '#F0DB4F',
        'typescript': '#007acc'
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            // default is 65ch, modified here to match
            // the max-w-screen-md applied to the rest of
            // the site
            maxWidth: '768px',
            a: {
              textDecoration: 'none',
              fontWeight: 'inherit',
              '&:hover': {
                color: '#EC4899',
              }
              // TODO: match site link styles
            }
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.100'),

            h4: {
              color: theme('colors.gray.100')
            },

            h3: {
              color: theme('colors.gray.100')
            },

            h2: {
              color: theme('colors.gray.100')
            },
            
            h1: {
              color: theme('colors.gray.100')
            },

            a: {
              color: '#4F46E5'

            },

            pre: {
              backgroundColor: theme('colors.gray.700'),
              code: {
                color: theme('colors.gray.100')
              }
            },

            code: {
              color: theme('colors.gray.100')
            },

            strong: {
              color: theme('colors.gray.100')
            },

            blockquote: {
              p: {
                color: theme('colors.gray.100')
              }
            }
          }
        },
      })
    },
  },
  variants: {
    extend: {
      typography: ['dark']
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
