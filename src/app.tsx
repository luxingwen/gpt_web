/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-06-15 17:15:45
 * @LastEditTime: 2023-06-16 10:23:47
 */
import RightContent from '@/components/RightContent';
import type { AxiosError, RequestConfig, RequestOptions } from '@umijs/max';
import { RunTimeLayoutConfig } from '@umijs/max';
import { Space, Typography } from 'antd';
import Cookies from 'js-cookie';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  currentUser?: {
    name?: string;
  };
  fetchUserInfo: () => Promise<
    | {
        name?: string;
      }
    | undefined
  >;
}> {
  const fetchUserInfo = async () => {
    try {
      return { name: 'draco' };
    } catch (error) {
      return undefined;
    }
  };
  return { currentUser: await fetchUserInfo(), fetchUserInfo };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    title: 'AI 云助手',
    layout: 'mix',
    contentWidth: 'Fluid',
    iconfontUrl: '',
    fixedHeader: true,
    fixSiderbar: true,
    colorWeak: false,
    splitMenus: true,
    pwa: false,
    menu: { locale: false },
    collapsedButtonRender: false,
    rightContentRender: () => <RightContent />,
    menuContentRender: (props, defaultDom) => {
      console.log(props);
      return defaultDom;
    },
    menuFooterRender: () => {
      return (
        <Space
          direction="vertical"
          align="center"
          style={{
            width: '100%',
          }}
        >
          <Typography.Text>如何使用AI画涂？</Typography.Text>
          <Typography.Text type="secondary">copyright@AI云助手</Typography.Text>
        </Space>
      );
    },
  };
};

let defaultToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMTE5IiwiZXhwIjoxNzA0NDYyMzk1LCJpYXQiOjE2ODU3MTM1OTUsImlzcyI6InRlc3QifQ.jfVomRADsD1IaiEjV37Ovvjuukzarflqx_BFDo0kG5o';

export const request: RequestConfig = {
  withCredentials: true,
  requestInterceptors: [
    (config: RequestOptions) => {
      let currentToken = Cookies.get('token');
      if (!currentToken || currentToken === 'undefined') {
        console.log('token不存在');
        // header['X-Nideshop-Token'] = defaultToken;
        currentToken = defaultToken;
      }
      return {
        ...config,
        headers: {
          ...config.headers,
          'X-Nideshop-Token': currentToken,
        },
      };
    },
  ],
  errorConfig: {
    errorHandler: (error, opts) => {
      if (opts?.skipErrorHandler) throw error;
      const { response } = error as AxiosError<unknown, unknown>;
      if (response && response.status !== 200) {
        // 请求已发送但服务端返回状态码非200系列
        console.log(response);
      } else if (!response) {
        // 请求尚未发送就失败，网络问题或者请求被阻止等原因
        console.log('failed');
      }
      throw error; // 如果throw. 错误将继续抛出.
    },
  },
};
