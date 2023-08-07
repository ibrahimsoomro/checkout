// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
const { pathsToModuleNameMapper } = require('ts-jest');
const { compilerOptions } = require('./tsconfig.base');

module.exports = {
  clearMocks: true,
  coveragePathIgnorePatterns: ['/node_modules/', '/__tests__/support/', '/__tests__/factories/'],
  coverageProvider: 'v8',
  maxWorkers: 1,
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/src/' }),
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
  testPathIgnorePatterns: ['/node_modules/', 'dist', '.eslintrc.js', './src/shared/__tests__/support'],
};