import { readFile } from 'fs/promises';
import path from 'node:path';

import { transform } from '@swc/core';
import type { Options } from '@swc/core/types.js';
import glob from 'fast-glob';
import { outputFile } from 'fs-extra/esm';
import yargs, { ArgumentsCamelCase } from 'yargs';
import { hideBin } from 'yargs/helpers';

import { getPolyfills } from './util.js';

interface BuildArgs {
  // legacy:legacy-ES6模块传统构建，支持ie11
  // modern:node-CommonJS模块构建
  // node:node-CommonJS模块构建
  // stable:stable-ES6模块标准构建，chrome 90以上版本
  bundle: 'legacy' | 'modern' | 'node' | 'stable';
  largeFiles: boolean;
  outDir: string;
  verbose: boolean;
}

const bundles = [
  // legacy-ES6模块传统构建，支持ie11
  'legacy',
  // modern-ES6模块现代化构建，最新版本浏览器
  'modern',
  // node-CommonJS模块构建
  'node',
  // stable-ES6模块标准构建，chrome 90以上版本
  'stable',
];

const build = async (args: ArgumentsCamelCase<BuildArgs>) => {
  const { bundle, largeFiles, outDir: relativeOutDir, verbose = false } = args;

  if (bundles.indexOf(bundle) === -1) {
    throw new TypeError(
      `无法识别的捆绑包 '${bundle}'。是否包含在"${bundles.join('", "')}"中?`,
    );
  }
  const srcDir = path.resolve('src');

  const extensions = ['.js', '.ts', '.tsx'];
  const ignore = [
    '**/*.d.ts',
    '**/*.__test__.js',
    '**/*.__test__.ts',
    '**/*.__test__.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.test.js',
    '**/*.test.ts',
    '**/*.test.tsx',
  ];

  const outDir = path.resolve(
    relativeOutDir,
    // We generally support top level path imports e.g.
    // 1. `import ArrowDownIcon from '@mui/icons-material/ArrowDown'`.
    // 2. `import Typography from '@mui/material/Typography'`.
    // The first case resolves to a file while the second case resolves to a package first i.e. a package.json
    // This means that only in the second case the bundler can decide whether it uses ES modules or CommonJS modules.
    // Different extensions are not viable yet since they require additional bundler config for users and additional transition steps in our repo.
    // Switch to `exports` field in v6.
    {
      node: './node',
      modern: './modern',
      stable: './',
      legacy: './legacy',
    }[bundle],
  );

  const targets = getPolyfills();

  const type = {
    node: 'commonjs',
    modern: 'es6',
    stable: 'es6',
    legacy: 'es6',
  }[bundle];

  const swcOptions = {
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: false,
        dynamicImport: false,
      },
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
      target: 'es5',
      loose: false,
      externalHelpers: false,
      keepClassNames: false,
      ...(largeFiles ? { minify: { compress: true } } : {}),
    },
    env: {
      targets,
      mode: 'usage',
      coreJs: '3.22',
    },
    module: {
      type,
      strict: false,
      strictMode: true,
      lazy: false,
      noInterop: false,
    },
    ...(largeFiles ? { minify: true } : { minify: false }),
  } as Options;

  const codeFiles = glob.sync(`**/*{${extensions.join(',')}}`, {
    cwd: srcDir,
    ignore,
  });

  const rewrittenTally = 0;
  let errorTally = 0;
  await Promise.all(
    codeFiles.map(async (declarationFile) => {
      try {
        const code = await readFile(path.join(srcDir, declarationFile), 'utf8');
        const data = await transform(code, swcOptions);
        const outFileName = declarationFile.replace(/.[t|j]sx?$/, '.js');
        await outputFile(path.join(outDir, outFileName), data.code, 'utf8');
      } catch (e) {
        console.error(e);
        errorTally += 1;
        process.exitCode = 1;
      }
    }),
  );

  if (verbose) {
    // eslint-disable-next-line no-console
    console.log(
      `Fixed: ${rewrittenTally}\nFailed: ${errorTally}\nTotal: ${codeFiles.length}`,
    );
  }
};

yargs(hideBin(process.argv))
  .command({
    command: '$0 <bundle>',
    builder: (commands) =>
      commands
        .positional('bundle', {
          description: `有效捆绑类型: "${bundles.join('" | "')}"`,
          type: 'string',
        })
        .option('out-dir', { default: './build', type: 'string' })
        .option('verbose', { type: 'boolean', default: true })
        .option('largeFiles', {
          type: 'boolean',
          default: false,
          describe:
            'Set to `true` if you know you are transpiling large files.',
        }),
    handler: build,
  })
  .help()
  .strict(true)
  .version(true)
  .parse();
