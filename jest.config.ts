import type { JestConfigWithTsJest } from 'ts-jest';

const jestConfig = {
  // [...]
  // Replace `ts-jest` with the preset you want to use
  // from the above list
  preset: 'ts-jest/presets/default-esm',
  modulePaths: ['<rootDir>'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  rootDir: './',
  moduleDirectories: ['node_modules'],
  projects: [
    {
      displayName: 'core package',
      testMatch: ['<rootDir>/packages/core/__test__/*.(test|spec).ts'],
      extensionsToTreatAsEsm: ['.ts'],
      moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
      transform: {
        '^.+\\.m?[tj]sx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/core/tsconfig.json',
            useESM: true,
          },
        ],
      },
    },
    {
      displayName: 'gird package',
      testMatch: ['<rootDir>/packages/uro-grid-core/__test__/*.(test|spec).ts'],
      extensionsToTreatAsEsm: ['.ts'],
      moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
      transform: {
        '^.+\\.m?[tj]sx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/uro-grid-core/tsconfig.jest.json',
            useESM: true,
          },
        ],
      },
    },
    {
      displayName: 'dnd',
      testMatch: [
        '<rootDir>/packages/uro-simple-dnd/__test__/*.(test|spec).ts',
      ],
      extensionsToTreatAsEsm: ['.ts'],
      moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
      transform: {
        '^.+\\.m?[tj]sx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/uro-grid-core/tsconfig.json',
            useESM: true,
          },
        ],
      },
    },
    {
      displayName: 'sense',
      testMatch: ['<rootDir>/packages/uro-sense/__test__/*.(test|spec).ts'],
      extensionsToTreatAsEsm: ['.ts'],
      moduleNameMapper: {
        '^(\\.{1,2}/.*)\\.js$': '$1',
      },
      transform: {
        '^.+\\.m?[tj]sx?$': [
          'ts-jest',
          {
            tsconfig: '<rootDir>/packages/uro-sense/tsconfig.json',
            useESM: true,
          },
        ],
      },
    },
  ],
};

export default jestConfig;
