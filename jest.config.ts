import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  testEnvironment: 'node',
  preset: 'ts-jest', // or other ESM presets
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  errorOnDeprecated: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^test/(.*)$': '<rootDir>/test/$1',
  },
};

export default config;
