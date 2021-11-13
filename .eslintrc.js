/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "google",
    "eslint:recommended",
    "prettier",
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: [
    "react",
    "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks",
  ],
  ignorePatterns: [
    "temp.js",
    "**/*.test.js",
    "**/src/twtheme/twtheme.js",
    "**/tailwind.config.js",
  ],
  rules: {
    "react/prop-types": 0,
    "react-in-jsx-scope": 0,
    "react/display-name": 0,
    "require-jsdoc": 0,
    // temporary
    camelcase: 0,
    "react-hooks/exhaustive-deps": "error",
    "no-unused-vars": ["warn"],
  },
  settings: {
    react: { version: "detect" },
  },
};
