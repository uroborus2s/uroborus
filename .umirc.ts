import { defineConfig } from 'umi';

export default defineConfig({
  define: {
    apiBaseUrl: 'http://whzhsc.com.cn/api/v1/',
    socketServer: 'ws://www.whzhsc.com.cn/',
  },
  alias: {
    '@ibr': '@/components',
    '@ibr-types': '@/core/ibr-types',
    '@ibr-request': '@/core/ibr-request',
    '@ibr-class': '@/core/ibr-class',
    '@hooks': '@/core/hooks',
  },
  chainWebpack(config) {
    config.module
      .rule('otf')
      .test(/.(otf|ttf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
  nodeModulesTransform: {
    type: 'all',
  },
  webpack5: {},
  mfsu:{},
  routes: [
    {
      path: '/desktop',
      exact: true,
      component: '@/pages/account/Login',
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          exact: true,
          component: '@/pages/home/HomePage',
        },
        {
          path: '/base/:baseId',
          exact: true,
          component: '@/pages/base/BaseMainPage',
        },
      ],
    },
  ],
});
