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
      primaryBg: "rgb(var(--primaryBg))",
      secondryBg: "rgb(var(--secondryBg))",
      hoverBg: "rgb(var(--hoverBg))",
      primaryTxt: "rgb(var(--primaryTxt))",
      secondryTxt: "rgb(var(--secondryTxt))",
      accent: "rgb(var(--accentColor))",
      border: "rgb(var(--borderColor))",
      danger: "#f4222f",
      tooltipBg: "#485a68",
      blueColor: "#1d9bf0",
      greenColor: "#00ba7c",
      pinkColor: "#f91880",
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
    extend: {
      screens: {
        xs: "600px",
      },
      fontSize: {
        10: "10px",
        13: "13px",
        15: "15px",
        17: "17px",
        20: "20px",
      },
      spacing: {
        12.5: "3.125rem" /* 50px */,
        25: "6.25rem" /* 100px */,
        50: "12.50rem" /* 2000px */,
        75: "18.75rem" /* 300px */,
        100: "25rem" /* 400px */,
        125: "31.25rem" /* 500px */,
        150: "37.5rem" /* 600px */,
        "9/10": "90%",
      },
      boxShadow: {
        twitter:
          "0 0 15px rgb(var(--primaryTxt)/.2), 0 0 3px 1px rgb(var(--primaryTxt)/.2)",
      },
      animation: {
        spin: "spin 0.75s linear infinite",
      },
    },
  },
  plugins: [require("./tw-classes")],
};
