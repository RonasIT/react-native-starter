module.exports = {
  preset: 'jest-expo',
  setupFilesAfterEnv: [
    '<rootDir>/setup-jest.ts'
  ],
  setupFiles: [
    '<rootDir>/node_modules/react-native-gesture-handler/jestSetup.js'
  ],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/'
  ],
  "transformIgnorePatterns": [
    "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|axios)"
  ],
  collectCoverageFrom: [
    '<rootDir>/src/app/**/*.{ts,tsx}'
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/app.config.ts',
    '<rootDir>/src/configurations/',
    '<rootDir>/src/tests/',
    '<rootDir>/src/app/index.tsx',
    '<rootDir>/src/app/shared/store',
    '<rootDir>/src/app/(.*)/index.ts'
  ],
  coverageThreshold: {
    global: {
      statements: 80
    }
  },
  moduleNameMapper: {
    '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    '^@store/(.*)$': '<rootDir>/src/app/shared/store/$1',
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@configurations': '<rootDir>/src/configurations/configuration',
    '^@assets/(.*)$': '<rootDir>/src/assets/$1',
    '^@tests/(.*)$': '<rootDir>/src/tests/$1,',
    '^@styles/(.*)$': '<rootDir>/src/styles/$1,'
  }
};
