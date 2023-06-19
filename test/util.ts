import { exec } from 'node:child_process';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getRootDir = () => {
  return path.resolve(__dirname, '..');
};

export const getPackageJson = () => {
  return JSON.parse(
    readFileSync(path.resolve(process.cwd(), './package.json'), {
      encoding: 'utf-8',
    }),
  );
};

export const resolve = (str: string) => {
  return path.resolve(__dirname, str);
};

export const execPromise = promisify(exec);
