import {
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Space } from 'antd';
import Cookies from 'js-cookie';
import HeaderDropdown from '../HeaderDropdown';
import { history } from 'umi';
import { wxlogin } from '@/service/user';

// const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMTE5IiwiZXhwIjoxNzA0NDYyMzk1LCJpYXQiOjE2ODU3MTM1OTUsImlzcyI6InRlc3QifQ.jfVomRADsD1IaiEjV37Ovvjuukzarflqx_BFDo0kG5o';
const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyNjAwMDAiLCJleHAiOjE3MDU0MDkzNDksImlhdCI6MTY4NjY2MDU0OSwiaXNzIjoidGVzdCJ9.ACRdI-Y3Mc6UKvOIo7wO2mHVdJKi-97q-hsZEUy0EXE';

export default function RightContent() {
  const { initialState, setInitialState } = useModel('@@initialState');

  const currentUser = initialState?.currentUser;
  const fetchUserInfo = initialState?.fetchUserInfo;
  // console.log('RightContent', currentUser);
  const handleClickLogin = async () => {
    wxlogin();
  };

  const handleLogout = () => {
    console.log('logout');
    // storage.removeItem('userInfo');
    Cookies.remove('token');
    setInitialState({
      ...initialState,
      currentUser: undefined,
    });
    // setUserInfo(null);
    // history.push('/');
  };

  return (
    <Space className="mr-4 cursor-pointer">
      {currentUser ? (
        <HeaderDropdown
          menu={{
            selectedKeys: [],
            onClick: (event) => {
              const { key } = event;
              console.log(key);
              if (key === 'center') {
                history.push('/user/account')
              }
              if (key === 'logout') {
                handleLogout();
              }
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
          <Space>
            <Avatar src={currentUser.avatar}></Avatar>
            <span>{currentUser.nickname}</span>
          </Space>
        </HeaderDropdown>
      ) : (
        <Space onClick={handleClickLogin}>
          <LoginOutlined />
          <span>登录</span>
        </Space>
      )}
    </Space>
  );
}
