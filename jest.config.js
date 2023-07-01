/** @type {import('jest').Config} */
const config = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  setupFiles: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|axios)'],
  collectCoverageFrom: ['<rootDir>/app/**/*.{ts,tsx}', '<rootDir>/libs/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/app.config.ts', '<rootDir>/tests/', '<rootDir>/(.*)/index.ts'],
  coverageThreshold: {
    global: {
      statements: 80
    }
  },
  moduleNameMapper: {
    '^@libs/(.*)$': '<rootDir>/libs/$1',
    '^@app/(.*)$': '<rootDir>/app/$1',
    '^@i18n/(.*)$': '<rootDir>/i18n/$1',
    '^@assets/(.*)$': '<rootDir>/assets/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  }
};

module.exports = config;
