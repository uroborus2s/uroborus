import { promisify } from 'util';
import childProcess from 'child_process';
import * as path from 'path';
import fse from 'fs-extra';
import fg from 'fast-glob';
import chalk from 'chalk';

const exec = promisify(childProcess.exec);

const buildTypes = async (args) => {
  console.log(args);
  const fileName = args.dir || '';
  const packageRoot = process.cwd();
  const tsconfigPath = path.join(packageRoot, 'tsconfig.build.json');
  if (!fse.existsSync(tsconfigPath)) {
    throw new Error(
      '找不到构建此项目的tsconfig配置文件' +
        `程序包根目录需要包含‘tsconfig.json’。` +
        `程序根目录是 '${packageRoot}'`,
    );
  }
  await exec(
    ['pnpm', 'tsc', '-p', tsconfigPath, '--emitDeclarationOnly'].join(' '),
  );
  const publishDir = path.join(packageRoot, fileName);
  const declarationFiles = await fg('**/*.d.ts', {
    absolute: true,
    cwd: publishDir,
  });

  if (declarationFiles.length === 0) {
    throw new Error(`在位置:'${publishDir}'找不到声明文件!`);
  }

  let rewrittenTally = 0;
  let errorTally = 0;

  const rewriteImportPaths = async (declarationFile, publishDir) => {
    const code = await fse.readFile(declarationFile, { encoding: 'utf8' });
    let fixedCode = code;
    const changes = [];
    const importTypeRegExp = /import\(([^)]+)\)/g;
    let importTypeMatch;

    while ((importTypeMatch = importTypeRegExp.exec(code)) !== null) {
      const importPath = importTypeMatch[1].slice(1, -1);
      const isBareImportSpecifier = !importPath.startsWith('.');
      if (isBareImportSpecifier) {
        const resolvedImport = path.resolve(declarationFile, importPath);
        const importPathFromPublishDir = path.relative(
          publishDir,
          resolvedImport,
        );
        const isImportReachableWhenPublished =
          !importPathFromPublishDir.startsWith('.');
      }
    }

    const changed = changes.length > 0;
    if (changed) {
      await fse.writeFile(declarationFile, fixedCode);
    }

    return changes;
  };

  await Promise.all(
    declarationFiles.map(async (file) => {
      const rewrites = await rewriteImportPaths(file, publishDir);
      if (rewrites.length > 0) {
        // eslint-disable-next-line no-console -- Verbose logging
        console.log(
          `${chalk.bgYellow`FIXED`} '${file}':\n${rewrites.join('\n')}`,
        );
        rewrittenTally += 1;
      } else {
        // eslint-disable-next-line no-console -- Verbose logging
        console.log(`${chalk.bgGreen`OK`} '${file}'`);
      }
      try {
      } catch (e) {
        console.error(e);
        errorTally += 1;
        process.exitCode = 1;
      }
    }),
  );
};

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
yargs(hideBin(process.argv))
  .command({
    command: '$0 [dir]',
    description: '构建项目.d.ts',
    handler: buildTypes,
  })
  .help()
  .strict(true)
  .version(false)
  .parse();
