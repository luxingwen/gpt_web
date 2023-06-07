// config/config.ts

import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes: routes,
  proxy: {
    '/api': {
      target: 'https://chat.kimways.com/', //目标服务器地址
      changeOrigin: true,
    },
  },
});