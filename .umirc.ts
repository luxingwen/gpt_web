import { defineConfig } from 'umi';
import config from './config/config';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },

  fastRefresh: {},
  ...config,
});
