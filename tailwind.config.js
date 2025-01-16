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
        netural : "#111111",
        primary : "#191919",
        secondary : "#23232E",
        text_primary : "#D4D4D8",
        text_secondary: "#C5D7C5",
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

