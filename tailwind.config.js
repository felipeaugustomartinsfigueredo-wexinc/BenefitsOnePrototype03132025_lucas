/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          navy: '#253746',
          teal: '#00C7B1',
          lightBlue: '#A2DDF8',
          yellow: '#FFBF3F',
          red: '#C8102E',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        'roboto-condensed': ['Roboto Condensed', 'sans-serif'],
      },
      fontWeight: {
        light: 300,
        normal: 400,
        bold: 700,
        black: 900,
      },
    },
  },
  plugins: [],
};