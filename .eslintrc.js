module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["plugin:react/recommended", "google"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "eslint-plugin-import",
    "eslint-plugin-jsx-a11y",
    "eslint-plugin-react",
    "eslint-plugin-react-hooks"],
  ignorePatterns: ["temp.js", "**/*.test.js"],
  rules: {
    "react/prop-types": 0,
    "react-in-jsx-scope": 0,
    "react/display-name": 0,
    "require-jsdoc": 0,
    // temporary
    "camelcase": 0,
    "object-curly-spacing": ["error", "always"],
    "quotes": ["error", "double"],
    "max-len": ["warn", { ignoreStrings: true, ignoreTemplateLiterals: true, ignoreComments: true }],
    "indent": ["error", 2],
  },
  settings: {
    react: { "version": "detect" },
  },
};
