const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

const blueGray = {
  50: '#eceff1',
  100: '#cfd8dc',
  200: '#b0bec5',
  300: '#90a4ae',
  400: '#78909c',
  500: '#607d8b',
  600: '#546e7a',
  700: '#455a64',
  800: '#37474f',
  900: '#263238'
}

const cubeTemplate = '.2fr 1fr 1fr 1fr .2fr'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'blue-gray': blueGray,
        'primary': colors.teal[500],
        'background': blueGray[50],
        'background-dark': blueGray[900],
        'secondary': blueGray[200],
        'secondary-dark': blueGray[600],
        'surface': blueGray[100],
        'surface-dark': blueGray[800],
        'error': colors.red[600],
        'font': colors.slate[900],
        'font-dark': colors.slate[100]
      },
      gap: {
        'cube': '2px'
      },
      gridTemplateColumns: {
        'cube': cubeTemplate
      },
      gridTemplateRows: {
        'cube': cubeTemplate
      },
      borderRadius: {
        'cube': '1rem'
      }
    }
  },
  plugins: [
    plugin(({addVariant}) => {
      addVariant('can-hover', '@media (any-hover: hover)')
      addVariant('no-hover', '@media (any-hover: none)')
      addVariant('keyboard-h', '@media (max-height: 620px)')
      addVariant('keyboard-w', '@media (max-width: 450px)')
    })
  ],
};
