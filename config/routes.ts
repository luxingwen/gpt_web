export default [
  { exact: true, path: '/', component: 'index' },
  { exact: true, path: '/ai', component: '@/pages/AiChat' },
  { exact: true, path: '/tips/bag', component: '@/pages/TipsBag/index' },
  { exact: true, path: '/user/info', component: '@/pages/UserInfo/index' },
  { exact: true, path: '/user/goods', component: '@/pages/Goods/index' },
  { exact: true, path: '/price', component: '@/pages/Price/index' },
  {
    exact: true,
    path: '/tips/bag/chat/:scene',
    component: '@/pages/PromptChat/index',
  },
  {
    exact: true,
    path: '/user/invitation',
    component: '@/pages/Invitation/index',
  },
  {
    exact: true,
    path: '/user/redemption',
    component: '@/pages/Redemption/index',
  },
  {
    exact: true,
    path: '/smart-chat/scene',
    component: '@/pages/SmartChat/index',
  },
];
