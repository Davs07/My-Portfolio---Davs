/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        melodrama: ["Melodrama", "cursive"],
        microsoft: ["Microsoft Sans Serif", "sans-serif"],
        work: ["Work Sans", "sans-serif"],
      },
      fontSize: {
        "12xl": "12rem",
        "10xl": "10rem",
      },
    },
  },
  plugins: [],
};
