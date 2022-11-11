/* eslint @typescript-eslint/no-var-requires: "off" */

const path = require('path');
const errorCodesPath = path.resolve(
  __dirname,
  './config/public/error-codes.json',
);
const missingError =
  process.env.MUI_EXTRACT_ERROR_CODES === 'true' ? 'write' : 'annotate';

module.exports = function () {
  return {
    env: {
      test: {
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      },
    },
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current',
          },
          useBuiltIns: 'usage',
          corejs: '3.6.5',
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-state',
    ],
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: '@mui/core',
          libraryDirectory: '',
          camel2DashComponentName: false,
        },
        'core',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@uroborus/icons',
          libraryDirectory: '',
          camel2DashComponentName: false,
        },
        'icons',
      ],
    ],
  };
};
