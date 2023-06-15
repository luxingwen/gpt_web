export default [
  {
    path: '/',
    redirect: '/home',
  },
  {
    name: 'AI百宝助手',
    path: '/home',
    routes: [
      {
        name: '首页',
        path: 'home',
        component: './Home',
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
    path: '/home',
    routes: [
      {
        name: '首页',
        path: 'home',
        component: './Home',
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
    name: '个性化数字人',
    path: '/home',
    routes: [
      {
        name: '首页',
        path: 'home',
        component: './Home',
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
];
