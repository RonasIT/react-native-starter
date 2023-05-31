module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  setupFiles: ['<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  transformIgnorePatterns: ['node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|axios)'],
  collectCoverageFrom: ['<rootDir>/src/app/**/*.{ts,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/app.config.ts', '<rootDir>/src/tests/', '<rootDir>/src/(.*)/index.ts'],
  coverageThreshold: {
    global: {
      statements: 80
    }
  },
  moduleNameMapper: {
    '^@libs/(.*)$': '<rootDir>/src/libs/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1,'
  }
};
