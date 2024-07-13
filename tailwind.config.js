/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
import { white, black, transparent, inherit } from "tailwindcss/colors";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      white: white,
      black: black,
      inherit: inherit,
      transparent: transparent,
    },
    fontFamily: {
      chirp: ["Twitter Chirp", "Poppins", ...defaultTheme.fontFamily.sans],
      poppins: ["Poppins", ...defaultTheme.fontFamily.sans],
    },
    fontWeight: {
      regular: "400",
      medium: "500",
      bold: "700",
      black: "900",
    },
    extend: {},
  },
  plugins: [],
};
