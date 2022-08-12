const appPath = '<rootDir>/client/app';

const config = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/config/'
  ],
  setupFilesAfterEnv: [
    `${appPath}/test/setup-env.js`
  ],
  transformIgnorePatterns: [
    "/node_modules/.+(js|jsx)$"
  ],
  transform: {
    "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "jest-transform-css",
    "^.+\\.svg$": "jest-transform-file",
    "^(?!.*\\.(js|jsx|mjs|css|json|svg)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  moduleNameMapper: {
    '^common/(.*)': `${appPath}/bundles/common/$1`,
    '^components/(.*)': `${appPath}/bundles/components/$1`,
    '^images/(.*)': `${appPath}/bundles/images/$1`,
    '^pages/(.*)': `${appPath}/bundles/pages/$1`,
    '^utilities/(.*)': `${appPath}/bundles/utilities/$1`,
    '^test/(.*)': `${appPath}/test/$1`,
  },
};

module.exports = config;
