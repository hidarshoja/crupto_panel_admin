/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'color1' : '#FBFAF6',
        "color2" :"#5B7380",
        "color3" :"#31546B",
        "color4" :"#354D5A",

      }
    },
  },
  plugins: [],
}

