import colors from "tailwindcss/colors";
const plugin = require("tailwindcss/plugin");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = plugin.withOptions(function () {
  return function ({ addComponents, theme, addBase }) {
    addComponents({
      ".navLink": {
        padding: "12px",
        alignItems: "center",
        borderRadius: "9999px",
        display: "inline-flex",
        transition: "all .2s ease",
      },
      ".btn": {
        height: "32px",
        fontWeight: 700,
        fontSize: "15px",
        cursor: "pointer",
        borderWidth: "1px",
        textAlign: "center",
        paddingLeft: "16px",
        paddingRight: "16px",
        borderStyle: "solid",
        borderRadius: "9999px",
        transition: "all 0.2s linear",
      },
      ".accent-btn": {
        color: colors.white,
        borderColor: theme("colors.accent"),
        backgroundColor: theme("colors.accent"),
        "&:hover": {
          filter: "saturate(1.5)",
        },
      },
      ".hollow-btn": {
        borderColor: "#536471",
        color: theme("colors.primaryTxt"),
        backgroundColor: colors.transparent,
        "&:hover": {
          backgroundColor: theme("colors.hoverBg"),
        },
      },
      ".theme-btn": {
        color: theme("colors.primaryBg"),
        borderColor: theme("colors.primaryTxt"),
        backgroundColor: theme("colors.primaryTxt"),
        "&:hover": {
          backgroundColor: "#D7DBDC",
        },
      },
      ".text-field": {
        width: "100%",
        height: "50px",
        fontSize: "15px",
        borderRadius: "8px",
        transition: "all 0.1s linear",
        padding: "20px 12px 4px 12px",
        backgroundColor: "transparent",
        color: theme("colors.primaryTxt"),
        "&:focus + label": {
          fontSize: "11px",
          color: theme("colors.accent"),
          transform: "translateY(-18px)",
        },
        "&:valid + label": {
          fontSize: "11px",
          transform: "translateY(-18px)",
        },
        "&:focus ~ .text-field-count": {
          display: "inline",
        },
      },
      ".text-field-label": {
        top: "50%",
        left: "12px",
        cursor: "text",
        fontSize: "17px",
        position: "absolute",
        transition: "all 0.1s linear",
        transform: "translateY(-50%)",
        color: theme("colors.secondryTxt"),
      },
      ".text-field-error": {
        left: "12px",
        bottom: "-18px",
        fontSize: "12px",
        position: "absolute",
        color: theme("colors.danger"),
      },
      ".text-field-count": {
        top: "4px",
        right: "8px",
        display: "none",
        fontSize: "11px",
        position: "absolute",
        color: theme("colors.secondryTxt"),
      },
      ".overlay": {
        zIndex: 20,
        inset: "0px",
        position: "fixed",
        backgroundColor: "var(--popupBg)",
      },
      ".model": {
        zIndex: 30,
        position: "relative",
        boxShadow: theme("boxShadow.xl"),
        backgroundColor: theme("colors.primaryBg"),
      },
      ".border-1": {
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: theme("colors.border"),
      },
      ".absolute-center": {
        top: "50%",
        left: "50%",
        position: "absolute",
        transform: "translate(-50%, -50%)",
      },
      ".flex-center": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      },
      ".transition-300": {
        transition: "all 0.3s linear",
      },
      ".transition-200": {
        transition: "all 0.2s linear",
      },
    }),
      addBase({
        svg: {
          fill: theme("colors.primaryTxt"),
        },
        input: {
          outlineWidth: "0px",
        },
      });
  };
});
