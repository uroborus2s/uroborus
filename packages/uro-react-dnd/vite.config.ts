import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

const packageJson = JSON.parse(
  readFileSync(path.resolve(process.cwd(), './package.json'), {
    encoding: 'utf-8',
  }),
);
const globals = {
  ...(packageJson?.dependencies || {}),
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      // 组件库源码的入口文件
      entry: path.resolve(__dirname, 'src/index.ts'),
      // 组件库名称
      name: '@uroborus/core',
      fileName: (format) => `index.${format}.js`,
      // 打包格式
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      // 排除不相关的依赖
      external: [...Object.keys(globals)],
    },
  },
});
