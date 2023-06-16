import {
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space } from 'antd';
import HeaderDropdown from '../HeaderDropdown';

export default function RightContent() {
  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;

  return (
    <Space
      style={{
        marginRight: 16,
      }}
    >
      <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: (event) => {
            const { key } = event;
            console.log(key);
          },
          items: [
            {
              key: 'center',
              icon: <UserOutlined />,
              label: '个人中心',
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: '个人设置',
            },
            {
              type: 'divider' as const,
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: '退出登录',
            },
          ],
        }}
      >
        {currentUser ? (
          <span>
            <UserOutlined />
            <span>{currentUser.name}</span>
          </span>
        ) : (
          <span>
            <LoginOutlined />
            <span>登录</span>
          </span>
        )}
      </HeaderDropdown>
    </Space>
  );
}
