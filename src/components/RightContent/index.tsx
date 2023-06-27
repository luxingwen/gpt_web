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
import { wxlogin, logout } from '@/service/user';
import { useEffect, useState } from "react";


export default function RightContent({ isHome = false }) {
  const { initialState, setInitialState } = useModel('@@initialState');

  const currentUser = initialState?.currentUser;
  const fetchUserInfo = initialState?.fetchUserInfo;

  useEffect(() => {
    if (!currentUser) {
      fetchUserInfo?.().then((res) => {
        if (res) {
          setInitialState((s) => ({ ...s, currentUser: res }));
        }
      });
    }
  }, [currentUser]);


  const handleClickLogin = async () => {
    wxlogin();
  };

  const handleLogout = () => {
    logout();
    console.log('logout');
  };

  return (
    <Space className={`mr-4 cursor-pointer`}>
      {currentUser ? (
        <HeaderDropdown
          placement={isHome ? 'bottom' : ''}
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
            {!isHome && <span>{currentUser.nickname}</span>}
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
