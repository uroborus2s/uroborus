import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    apiBaseUrl: 'http://8.136.107.252:8000/api/v1/',
    socketServer: 'ws://8.136.107.252:8000/',
  },
  alias: {
    '@ibr': '@/components',
    '@ibr-types': '@/core/ibr-types',
    '@ibr-request': '@/core/ibr-request',
    '@ibr-class': '@/core/ibr-class',
    '@hooks': '@/core/hooks',
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
