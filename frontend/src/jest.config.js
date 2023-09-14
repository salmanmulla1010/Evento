export default {
  runner: 'esm',
  preset: 'react-scripts',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'], // If you have custom setup
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
}
