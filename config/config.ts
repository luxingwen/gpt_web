import { defineConfig } from '@umijs/max';
import proxy from './proxy';
import routes from './routes';

export default defineConfig({
  favicons: ['/app_logo.svg'],
  antd: {
    configProvider: {
      theme: {
        token: {
          colorPrimary: '#4b64f3',
          colorLink: '#4b64f3',
          colorLinkHover: '#7891ff',
          colorLinkActive: '#4b64f3',
        },
      },
    },
    // styleProvider: {
    //   autoClear: true,
    //   hashPriority: 'high',
    //   legacyTransformer: true,
    // },
  },
  esbuildMinifyIIFE: true,
  codeSplitting: { jsStrategy: 'granularChunks' },
  ignoreMomentLocale: true,
  fastRefresh: true,
  hash: true,
  crossorigin: {},
  deadCode: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'AI 云助手',
  },
  routes,
  proxy,
  npmClient: 'pnpm',
  tailwindcss: {},
});
