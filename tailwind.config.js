/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    plugin(function({ addUtilities }) {
    addUtilities({
      '.no-scrollbar::-webkit-scrollbar': {
        'display': 'none',
      },
      '.no-scrollbar': {
        '-ms-overflow-style': 'none',
        'scrollbar-width': 'none'
      },
      '.text-2xs' : {
        'font-size' : '0.625rem',
        'line-height' : '0.75rem'
      },
      '.pt-5625-p' : {
        'padding-top' : '56.25%'
      }
    })
  })],
}
