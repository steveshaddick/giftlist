module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: [
    'react',
    'prettier',
    'jest',
  ],
  rules: {
    'react/forbid-prop-types': 0,
    'react/jsx-boolean-value': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/no-danger': 0,
    'prettier/prettier': [
      'error',
      {},
      { usePrettierrc: true },
    ],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack/webpack.config.js',
      },
    },
  },
};
