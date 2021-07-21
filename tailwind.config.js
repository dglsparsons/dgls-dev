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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
