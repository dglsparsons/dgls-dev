const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      gray: colors.blueGray,
    },
    extend: {
      gridTemplateColumns: {
        'auto-fr': 'auto 1fr',
        'fr-auto': '1fr auto'
      },
      typography: {
        DEFAULT: {
          css: {
            color: colors.blueGray[600],
            h2: {
              color: colors.blueGray[600],
              fontSize: '1.125rem',
              fontWeight: 500,
            },
            code: {
              color: colors.blueGray[700],
            },
            strong: {
              color: colors.blueGray[700],
              fontWeight: 500,
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
