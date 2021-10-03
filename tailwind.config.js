const { theme } = require("./src/twtheme");

module.exports = {
  theme,
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
