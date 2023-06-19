import { ExecOptions } from 'child_process';
import { exec } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

import { transform } from '@swc/core';
import browserslist from 'browserslist';
import * as fse from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRootDir = () => {
  return path.resolve(__dirname, '..');
};

export const getPackageJson = () => {
  return JSON.parse(
    fse.readFileSync(path.resolve(process.cwd(), './package.json'), {
      encoding: 'utf-8',
    }),
  );
};

export const resolve = (str: string) => {
  return path.resolve(__dirname, str);
};

export const execPromise: (
  command: string,
  options: ExecOptions,
) => Promise<{ stdout: string; stderr: string }> = promisify(exec);

export const getPolyfills = () => {
  browserslist.clearCaches();
  const env = process.env.BROWSERSLIST_ENV;
  return browserslist(undefined, { env }).join(',');
};

export const rewriteTransform = async (declarationFile: string) => {
  const code = await fse.readFile(declarationFile, 'utf8');
  await transform(code, {});
};
