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
        neutrals800: 'var(--neutrals-800)',
        neutrals600: 'var(--neutrals-600)',
        neutrals900: 'var(--neutrals-900)'
      },
      backgroundColor: {
        rose: {
          o10: "var(--rose-o10)",
          o20: "var(--rose-o20)",
          o40: "var(--rose-o10)",
        }

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

