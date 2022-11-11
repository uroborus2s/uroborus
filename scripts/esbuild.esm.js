import esbuild from 'esbuild';

console.log(process.cwd());

esbuild.buildSync({
  absWorkingDir: process.cwd(),
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'dist/index.esm.js',
  format: 'esm',
  tsconfig: 'tsconfig.build.json',
  target: ['esnext'],
});
