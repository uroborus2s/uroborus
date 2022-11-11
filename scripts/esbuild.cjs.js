import esbuild from 'esbuild';

esbuild.buildSync({
  absWorkingDir: process.cwd(),
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  sourcemap: true,
  outfile: 'dist/index.cjs.js',
  format: 'cjs',
  tsconfig: 'tsconfig.build.json',
  target: ['esnext'],
});
