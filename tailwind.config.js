/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Montserrat" :['Montserrat']
      },
      colors:{
        netural : "#121212",
        primary : "#0f0f13",
        secondary : "#23232E",
        text_primary : "#E0E0E0",
        text_secondary: "#B0B0B0",
        border_primary : "#ffffff",
        highlight_red : "#FF5252",
        highlight_blue : "#29B6F6",
        highlight_green : "#4CAF50",
        highlight_error : "#FFC107",

      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
  darkMode: "class",
}

