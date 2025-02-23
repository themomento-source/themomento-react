/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        marcellus: ["Marcellus", "serif"], // Fixed syntax here
        "pt-serif": ["PT Serif", "serif"],
      },
      colors: {
        primary: "#FFCB00",
      },
      backgroundColor: {
        primary: "#FFCB00",
      },
    },
  },
  plugins: [],
};