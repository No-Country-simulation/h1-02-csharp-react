/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors:{
        primary: '#D65683',
        secondary: '#4A56AC',
        neutrals800: '#4E4949'
      },
      fontSize:{
        small: '14px',
        parrafo: '16px',
        subtitulo: '18px',
        titulopag: '24px',
        titulo: '40px'
      }
    },
  },
  plugins: [],
}

