const appPath = '<rootDir>/client/app';

const config = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/config/'
  ],
  setupFilesAfterEnv: [
    `${appPath}/test/setup-env.js`
  ],
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
