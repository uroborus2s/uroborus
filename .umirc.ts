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
  mfsu: {},
  chainWebpack(config) {
    config.module
      .rule('otf')
      .test(/.(otf|ttf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/Loading',
  },
  webpack5: {},
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/',
          name: 'home',
          component: '@/pages/home/HomePage',
        },
        {
          path: '/application/:appId',
          name: 'application',
          component: '@/pages/application/ApplicationPage',
        },
        {
          path: '/desktop',
          name: 'account',
          component: '@/pages/account/Login',
        },
      ],
    },
  ],
});
