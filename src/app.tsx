import Logo from '@/assets/images/logo.png';
import RightContent from '@/components/RightContent';
import type { AxiosError, RequestConfig, RequestOptions } from '@umijs/max';
import { RunTimeLayoutConfig, history } from '@umijs/max';
import { Button, Modal, Space, Typography } from 'antd';
import Cookies from 'js-cookie';
import { GlobalScrollbar } from 'mac-scrollbar';
import 'mac-scrollbar/dist/mac-scrollbar.css';

import { getUserInfo, wxlogin } from '@/service/user';
import { QuestionCircleOutlined } from '@ant-design/icons';

// 运行时配置

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
export async function getInitialState(): Promise<{
  currentUser?: API.User;
  fetchUserInfo?: () => Promise<API.User | undefined>;
}> {
  const fetchUserInfo = async () => {
    try {
      const response = await getUserInfo();
      return response.data;
    } catch (error) {
      return undefined;
    }
  };
  let currentUser: API.User | undefined = undefined;
  if (history.location.pathname !== '/') {
    currentUser = await fetchUserInfo();
  }

  return { currentUser, fetchUserInfo };
}

export const layout: RunTimeLayoutConfig = () => {
  return {
    token: {
      bgLayout: '#fff',
      // pageContainer: {
      //   paddingBlockPageContainerContent: 16,
      //   paddingInlinePageContainerContent: 16,
      // },
    },
    logo: Logo,
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
    // childrenRender: (children: React.ReactNode) => {
    //   return (
    //     <>
    //       {children}
    //       <GlobalScrollbar />
    //     </>
    //   );
    // },
    rightContentRender: () => <RightContent />,
    menuFooterRender: () => {
      return (
        <Space
          direction="vertical"
          align="center"
          style={{
            width: '100%',
          }}
        >
          <Button type="primary" onClick={() => history.push('/home')}>
            返回首页
          </Button>
          <a href="" target="_blank" className="text-black">
            <QuestionCircleOutlined /> 如何使用AI画涂？
          </a>
          <Typography.Text type="secondary">copyright@AI云助手</Typography.Text>
        </Space>
      );
    },
  };
};

const handleResponseInterceptors: IResponseInterceptorTuple = (
  response: Response,
  // options: RequestConfig,
) => {
  let isHome = location.pathname === '/';

  console.log('isHome:', isHome);
  console.log('location.pathname:', location.pathname);
  if (response.data.errno === 401 && !isHome) {
    Modal.error({
      title: '登录',
      content: '请登录后在使用',
      footer: [
        <Button key="login" onClick={wxlogin}>
          登录
        </Button>,
        <Button
          style={{ marginLeft: 10 }}
          key="cancel"
          onClick={() => {
            Modal.destroyAll();
            history.push('/');
          }}
        >
          取消
        </Button>,
      ],
    });
  }
  return response;
};

export const request: RequestConfig = {
  withCredentials: true,
  requestInterceptors: [
    (config: RequestOptions) => {
      let currentToken = Cookies.get('token');
      if (!currentToken || currentToken === 'undefined') {
        console.log('token不存在');
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
  responseInterceptors: [handleResponseInterceptors],
  errorConfig: {
    errorHandler: (error, opts) => {
      if (opts?.skipErrorHandler) throw error;
      const { response } = error as AxiosError<unknown, unknown>;

      if (response && response.status !== 200) {
        // 请求已发送但服务端返回状态码非200系列
        console.log('response faile:', response);
      } else if (!response) {
        // 请求尚未发送就失败，网络问题或者请求被阻止等原因
        console.log('failed');
      }
      throw error; // 如果throw. 错误将继续抛出.
    },
  },
};

export function rootContainer(container: any) {
  return (
    <>
      {container}
      <GlobalScrollbar />
    </>
  );
}
