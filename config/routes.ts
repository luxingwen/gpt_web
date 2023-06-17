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
    name: '个人中心',
    path: '/user',
    routes: [
      {
        name: '个人主页',
        path: 'account',
        component: './User/Account',
        icon: 'robot',
      },
    ]
  },
  {
    name: 'AI百宝助手',
    path: '/ai',
    routes: [
      {
        name: 'AI问答',
        path: 'qa',
        component: './AiChat',
        icon: 'robot',
      },
      {
        name: '百宝袋',
        path: 'tips',
        component: './TipsBag',
        icon: 'InboxOutlined',
      },
      {
        name: '热门问题',
        path: 'hot-qa',
        component: './TipsBag',
        icon: 'fire',
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
        path: 'text-to-image/auto-generate-prompt',
        name: '自动生成提示词',
        component: './AI-Paint/AutoGeneratePrompt',
        hideInMenu: true,
      },
      {
        path: 'text-to-image/drawing',
        name: '画图中',
        component: './AI-Paint/Drawing',
        hideInMenu: true,
      },
      {
        icon: 'bgColors',
        name: '图片生成图',
        path: 'image-to-image',
        component: './AI-Paint/ImageToImage',
      },
      {
        path: 'image-to-image/auto-generate-prompt',
        name: '自动生成提示词',
        component: './AI-Paint/AutoGeneratePrompt',
        hideInMenu: true,
      },
      {
        path: 'image-to-image/drawing',
        name: '画图中',
        component: './AI-Paint/Drawing',
        hideInMenu: true,
      },
      {
        icon: 'book',
        name: ' 精选作品',
        path: 'featured-works',
        component: './AI-Paint/FeaturedWorks',
      },
      {
        icon: 'folder',
        name: '画夹',
        path: 'picture-folder',
        component: './AI-Paint/PictureFolder',
      },
      {
        icon: 'heart',
        name: '个人展出&收藏',
        path: 'my-works',
        component: './AI-Paint/MyWorks',
      },
      {
        name: '作品详情',
        path: 'work-detail',
        component: './AI-Paint/WorkDetail',
        hideInMenu: true,
      },
    ],
  },
  {
    name: '个性化数字人',
    path: '/smart-ai',
    component: './SmartChat',
  },
  {
    name: '场景广场',
    path: '/smart-ai/:viewType',
    component: './SmartChat',
    hideInMenu: true,
  },
  {
    name: '创建场景',
    path: '/smart-ai/:viewType',
    component: './SmartChat',
    hideInMenu: true,
  },
  {
    name: '智能会话',
    path: '/smart-ai/:viewType/:sceneId',
    component: './SmartChat',
    hideInMenu: true,
  },
  {
    name: '智能会话',
    path: '/smart-ai/:viewType/:sceneId/:sessionId',
    component: './SmartChat',
    hideInMenu: true,
  },
  {
    name: '价格',
    path: '/price',
    component: './Price',
  },
  // {
  //   name: '个人中心',
  //   path: '/account/center',
  //   component: './UserInfo',
  //   hideInMenu: true,
  // },
];
