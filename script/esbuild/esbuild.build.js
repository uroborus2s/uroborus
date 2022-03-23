import esbuild from 'esbuild';
import path from 'path';
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);

const entryfile = path.resolve('src/index.ts');
const outputfile = path.resolve('dist/index.js');

esbuild.buildSync({
  watch: process.argv.includes('--watch'),
  entryPoints: [entryfile],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: outputfile,
  format: 'esm',
  target: ['esnext'],
});
