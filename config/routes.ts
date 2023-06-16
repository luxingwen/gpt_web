export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: '首页',
    path: 'home',
    component: './Home',
    layout: false,
  },
  {
    name: 'AI百宝助手',
    path: '/ai',
    routes: [
      {
        name: 'AI问答',
        path: 'qa',
        component: './AiChat',
      },
      {
        name: '权限演示',
        path: 'access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: 'table',
        component: './Table',
      },
    ],
  },
  {
    name: 'AI画涂',
    path: '/ai-paint',
    routes: [
      {
        path: '/ai-paint',
        redirect: '/ai-paint/text-to-image',
      },
      {
        icon: 'fontColors',
        name: '文字生成图',
        path: 'text-to-image',
        component: './AI-Paint/TextToImage',
      },
      {
        icon: 'bgColors',
        name: '图片生成图',
        path: 'access',
        component: './Access',
      },
      {
        icon: 'book',
        name: ' 精选作品',
        path: 'table',
        component: './Table',
      },
      {
        icon: 'folder',
        name: '画夹',
        path: 'folder',
        component: './Access',
      },
    ],
  },
  {
    name: '个性化数字人',
    path: '/smart-ai',
    component: './SmartChat',
  },
  {
    name: '个人中心',
    path: '/account/center',
    component: './UserInfo',
    hideInMenu: true,
  },
];
