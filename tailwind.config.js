const { theme } = require("./src/twtheme");

module.exports = {
  theme,
  plugins: [require("tailwindcss"), require("autoprefixer")],
};
