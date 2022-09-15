module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'standard-with-typescript',
    "plugin:react-hooks/recommended"
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ["tsconfig.json"]
  },
  plugins: [
    'react'
  ],
  rules: {
    "semi": "off",
    "@typescript-eslint/semi": "warn"
 },
}
