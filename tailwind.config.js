/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {
      colors:{
        primary: "#1C2434",
        secondary: "#606671",
        tertiary: "#F1F5F9",
        quaternary: "#E2E8F0",
        disabled: "#6e6d6d"
      }

    },
  },
  plugins: [],
}

