/*
 * @Author: Draco draco.coder@gmail.com
 * @Date: 2023-06-15 18:39:05
 * @LastEditors: Draco draco.coder@gmail.com
 * @LastEditTime: 2023-06-15 18:54:16
 * @FilePath: /gpt_web/config/routes.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
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
    path: '/home2',
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
    path: '/smart-ai',
    component: './SmartChat',
  },
];
