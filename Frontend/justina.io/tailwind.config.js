/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors:{
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        neutrals800: 'var(--color-neutrals-800)',
        neutrals600: 'var(--color-neutrals-600)',
        neutrals900: 'var(--color-neutrals-900)'
      },
      backgroundColor: {
        rose: {
          o10: "var(--color-rose-o10)",
          o20: "var(--color-rose-o20)",
          o40: "var(--color-rose-o40)",
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

