const colors = require("tailwindcss/colors");

const theme = {
  minHeight: {
    0: "0",
    "1/4": "25%",
    "1/2": "50%",
    "3/4": "75%",
    full: "100%",
  },
  colors: {
    ...colors,
    primary: { 0: "#5F2EEA", 1: "#2A00A2", 2: "#BCA4FF" },
    secondary: {
      0: "#1CC8EE",
      1: "#82E9FF",
    },
    success: { 0: "#00BA88", 1: "#34EAB9" },
    warning: { 0: "#F4B740", 1: "#FFD789" },
    error: { 0: "#ED2E7E", 1: "#C30052", 2: "#FFF3F8" },
    text: { 0: "#FFF" },
  },
  fontFamily: {
    sans: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Ubuntu",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif",
    ],
  },
};

module.exports = {
  theme,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
