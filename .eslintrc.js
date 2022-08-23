module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
    'prettier',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      'jsx': true,
    },
  },
  plugins: [
    'react',
    'prettier',
  ],
  rules: {
    'react/forbid-prop-types': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
  },
  settings: {
    'import/resolver': {
      webpack: {
        config: './config/webpack/webpack.config.js',
      }
    }
  }
};
