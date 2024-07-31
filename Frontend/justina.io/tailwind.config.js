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
        neutrals800: '#4E4949',
        neutrals600: '#7a7474'
      },
      backgroundColor: {
        "rose-o10": "rgba(253, 239, 244, 0.1)",
        "rose-o20": "rgba(253, 239, 244, 0.2)",
        "rose-o40": "rgba(253, 239, 244, 0.4)",
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

