/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import type { Config } from '@jest/types';
import { default as base } from './jest.config.base';

const config: Config.InitialOptions = {
  ...base,
  verbose: true,
  testEnvironment: 'node',
  preset: 'ts-jest/presets/default-esm', // or other ESM presets
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  projects: [
    '<rootDir>/packages/*/jest.config.ts',
    '<rootDir>/applications/*/jest.config.ts',
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!lodash-es)'],
};

export default config;
