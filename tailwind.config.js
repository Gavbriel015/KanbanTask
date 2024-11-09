/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  "darkMode": "class",
  theme: {
    extend: {
      colors: {
        mediumGray: '#828FA3',
        mainPurple: '#635FC7',
        mainRed: '#EA5555',
        hoverRed: '#FF9898',
        darkGray: "#2B2C37",
        bgDarkGray: "#20212C",
      }
    },
    fontFamily: {
      main: 'Plus Jakarta Sans, sans-serif',
    }
  },
  plugins: [],
}

