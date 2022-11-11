import { promisify } from 'util';
import childProcess from 'child_process';
import fg from 'fast-glob';
const exec = promisify(childProcess.exec);

const bundles = [
  // legacy build using ES6 modules
  'legacy',
  // modern build with a rolling target using ES6 modules
  'modern',
  // build for node using commonJS modules
  'node',
  // build with a hardcoded target using ES6 modules
  'stable',
];

const run = async (args) => {
  const { bundle, largeFiles, outDir: relativeOutDir, verbose } = args;

  if (bundles.indexOf(bundle) === -1) {
    throw new TypeError(
      `无法识别的捆绑包 '${bundle}'。是否包含在"${bundles.join('", "')}"中?`,
    );
  }

  const env = {
    NODE_ENV: 'production',
    BABEL_ENV: bundle,
    MUI_BUILD_VERBOSE: verbose,
  };

  const srcDir = path.resolve('./src');
  console.log(srcDir);
  const extensions = ['.js', '.ts', '.tsx'];
  const ignore = [
    '**/*.test.js',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/*.d.ts',
  ];

  const topLevelNonIndexFiles = fg
    .sync(`*{${extensions.join(',')}}`, { cwd: srcDir, ignore })
    .filter((file) => {
      console.log(file);
      return path.basename(file, path.extname(file)) !== 'index';
    });
  const topLevelPathImportsCanBePackages = topLevelNonIndexFiles.length === 0;

  const outDir = path.resolve(
    relativeOutDir,
    // We generally support top level path imports e.g.
    // 1. `import ArrowDownIcon from '@mui/icons-material/ArrowDown'`.
    // 2. `import Typography from '@mui/material/Typography'`.
    // The first case resolves to a file while the second case resolves to a package first i.e. a package.json
    // This means that only in the second case the bundler can decide whether it uses ES modules or CommonJS modules.
    // Different extensions are not viable yet since they require additional bundler config for users and additional transpilation steps in our repo.
    // Switch to `exports` field in v6.
    {
      node: topLevelPathImportsCanBePackages ? './node' : './',
      modern: './modern',
      stable: topLevelPathImportsCanBePackages ? './' : './esm',
      legacy: './legacy',
    }[bundle],
  );
  console.log(outDir);
};

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import path from 'path';
yargs(hideBin(process.argv))
  .command({
    command: '$0 <bundle>',
    description: '包构建',
    builder: (command) => {
      return command
        .positional('bundle', {
          description: `有效捆绑类型: "${bundles.join('" | "')}"`,
          type: 'string',
        })
        .option('largeFiles', {
          type: 'boolean',
          default: false,
          describe:
            'Set to `true` if you know you are transpiling large files.',
        })
        .option('out-dir', { default: './dist', type: 'string' })
        .option('verbose', { type: 'boolean' });
    },
    handler: run,
  })
  .help()
  .strict(true)
  .version(true)
  .parse();
