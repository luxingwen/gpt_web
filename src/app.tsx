import Logo from '@/assets/images/logo.png';
import RightContent from '@/components/RightContent';
import type { AxiosError, RequestConfig, RequestOptions } from '@umijs/max';
import { RunTimeLayoutConfig, history } from '@umijs/max';
import { Button, Modal, Space, Typography } from 'antd';
import Cookies from 'js-cookie';
import { GlobalScrollbar } from 'mac-scrollbar';
import 'mac-scrollbar/dist/mac-scrollbar.css';

import { getUserInfo, wxlogin } from '@/service/user';
import {
  StyleProvider,
  legacyLogicalPropertiesTransformer,
} from '@ant-design/cssinjs';
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

// 需要登录的路由路径
const protectedRoutes = [
  '/user',
  '/ai',
  '/ai-paint',
  '/smart-ai',
  '/smart-ai/:viewType',
  '/smart-ai/:viewType/:sceneId',
  '/smart-ai/:viewType/:sceneId/:sessionId',
];


export const layout: RunTimeLayoutConfig = ({ location, initialState }) => {

  // 检查用户是否已登录的函数
  const checkUserLoggedIn = () => {
    const currentUser = initialState?.currentUser;
    return !!currentUser;
  };

  // 根据登录状态和路由路径判断是否需要重定向到登录页面
  const shouldRedirectToLogin = () => {
    const isLoggedIn = checkUserLoggedIn();
    const isProtectedRoute = protectedRoutes.some((route) =>
      history.location.pathname.includes(route),
    );
    return isProtectedRoute && !isLoggedIn;
  };

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
    onPageChange: () => {
      if (shouldRedirectToLogin()) {
        Modal.error({
          title: '登录',
          content: '请登录后再使用',
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
    },
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
          <Button type="primary" onClick={() => history.push('/')}>
            返回首页
          </Button>
          {((page: string) => {
            if (page === "ai") {
              return (<a href="https://rvras57tio4.feishu.cn/wiki/FX0GwtoY2iChG2k7iXzceWW4n3b" target="_blank" className="text-black">
                <QuestionCircleOutlined /> 如何使用AI百宝助手？
              </a>)
            }
            return (
              <a href="https://rvras57tio4.feishu.cn/wiki/SnJTw2OjVi6wDYkLf6cccYaInjh" target="_blank" className="text-black">
                <QuestionCircleOutlined /> 如何使用AI画涂？
              </a>
            )
          })(history.location.pathname.split('/')[1])}
          <Typography.Text type="secondary">copyright@AI云助手</Typography.Text>
        </Space>
      );
    },
  };
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
    <StyleProvider
      hashPriority="high"
      autoClear
      transformers={[legacyLogicalPropertiesTransformer]}
    >
      {container}
      <GlobalScrollbar />
    </StyleProvider>
  );
}
