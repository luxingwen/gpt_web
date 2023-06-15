/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-06-15 17:40:51
 * @LastEditTime: 2023-06-15 17:40:51
 */
export {};

declare global {
  declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;

  interface Window {
    __POWERED_BY_QIANKUN__: boolean | undefined;
  }
}
