/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: colors.transparent,
      primaryBg: "var(--primaryBg)",
      secondryBg: "var(--secondryBg)",
      hoverBg: "var(--hoverBg)",
      popupBg: "var(--popupBg)",
      primaryTxt: "var(--primaryTxt)",
      secondryTxt: "var(--secondryTxt)",
      accent: "var(--accentColor)",
      border: "var(--borderColor)",
      red: "#F4222F",
    },
    fontFamily: {
      chirp: ["chirp", "sans-serif"],
      "chirp-medium": ["chirp-medium", "sans-serif"],
      "chirp-semibold": ["chirp-semibold", "sans-serif"],
      "chirp-bold": ["chirp-bold", "sans-serif"],
      "chirp-black": ["chirp-black", "sans-serif"],
    },
    fontSize: {
      12: "12px",
      13: "13px",
      15: "15px",
      20: "20px",
    },
    extend: {
      spacing: {
        25: "25px",
        50: "50px",
        100: "100px",
        200: "200px",
        300: "300px",
        350: "350px",
        500: "500px",
      },
      boxShadow: {
        twitter: "0 0 15px #ffffff33, 0 0 3px 1px #ffffff26",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
