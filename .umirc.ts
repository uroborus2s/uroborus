import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    apiBaseUrl: 'http://localhost:8000/',
    socketServer: 'ws://localhost:8000/',
  },
  alias: {
    '@ibr': '@/components',
    '@hooks': '@/components/core/hooks',
  },
  plugins: ['plugin-sass'],
  nodeModulesTransform: {
    type: 'none',
  },
  webpack5: {},
  sass: {
    implementation: require('node-sass'),
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          name: 'workspace',
          component: '@/pages/workspace/WorkSpacePage',
        },
        {
          path: '/application/:appId',
          name: 'application',
          component: '@/pages/application/ApplicationPage',
        },
      ],
    },
  ],
});
