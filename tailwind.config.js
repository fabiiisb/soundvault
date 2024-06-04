/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react')

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blackPurple: {
          50: '#f8f3fc',
          100: '#efe6f8',
          200: '#d9c7f0',
          300: '#b695e4',
          400: '#8d5cd4',
          500: '#7037c0',
          600: '#5d27a2',
          700: '#4e2183',
          800: '#421f6d',
          900: '#3b1e5c',
          950: '#08040c'
        },
        niceOrange: {
          50: '#fff6ed',
          100: '#ffebd5',
          200: '#fed3aa',
          300: '#feb373',
          400: '#fc8434',
          500: '#fa6715',
          600: '#eb4d0b',
          700: '#c3380b',
          800: '#9b2d11',
          900: '#7d2811',
          950: '#431107'
        },
        bgBlur: {
          50: '#faf5f7',
          100: '#f6edf1',
          200: '#eedce4',
          300: '#e1c0ce',
          400: '#cd99ae',
          500: '#bb7993',
          600: '#a55d75',
          700: '#8c4a5e',
          800: '#753f4f',
          900: '#633844',
          950: '#381c24'
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
      },
      screens: {
        mini350: '350px',
        mini: '384px',
        minimd: '480px',
        minixl: '510px',
        sm870: '870px'
      }
    }
  },
  darkMode: 'class',
  plugins: [nextui()]
}
