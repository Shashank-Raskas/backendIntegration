module.exports = {
  parser: '@typescript-eslint/parser', // if you're using TypeScript
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  plugins: ['react', 'react-hooks'],
  settings: {
    react: {
      version: 'detect', // Automatically detect the version of React
    },
  },
  rules: {
    // Add or override any ESLint rules you want
    'react/prop-types': 'off', // Example: turn off prop-types rule if not using them
    'no-unused-vars': 'warn', // Example: set unused-vars as a warning instead of error
    "react/react-in-jsx-scope": "off", // Disable the rule
  },
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
};
