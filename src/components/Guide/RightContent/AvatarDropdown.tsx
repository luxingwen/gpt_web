import React, { useCallback } from 'react';

import { gotoLoginPage, logout, useModel } from 'umi';

import { IRStorage } from '@infore/utils';

import { DownOutlined, ExclamationCircleOutlined, LogoutOutlined } from '@ant-design/icons';
import { Avatar, Menu, Modal, Space, Spin } from 'antd';
import type { MenuInfo } from 'rc-menu/lib/interface';

import { IAMLogout } from '@/services/platform/IAM';

import HeaderDropdown from '../HeaderDropdown';

import UserIcon from '@/assets/image/header/user.png';

import styles from './index.less';

export type GlobalHeaderRightProps = {
  menu?: boolean;
};

const { confirm } = Modal;

const AvatarDropdown: React.FC<GlobalHeaderRightProps> = ({ menu }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const loginOut = useCallback(() => {
    confirm({
      title: '提示',
      icon: <ExclamationCircleOutlined />,
      content: '确定要退出登录吗?',
      onOk() {
        if (initialState) {
          IAMLogout({
            token: IRStorage.getAuthToken('accessToken')!,
          })
            .then(() => {
              logout();
              setInitialState({ ...initialState, currentUser: undefined });
              gotoLoginPage();
            })
            .catch(() => {});
        }
      },
    });
  }, [initialState, setInitialState]);

  const onMenuClick = useCallback(
    (event: MenuInfo) => {
      const { key } = event;
      if (key === 'logout') loginOut();
    },
    [loginOut],
  );

  const loading = (
    <span className={`${styles.action} ${styles.account}`}>
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    </span>
  );

  if (!initialState) {
    return loading;
  }

  const { currentUser } = initialState;

  if (!currentUser || !currentUser.username) {
    return loading;
  }

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && <Menu.Divider />}
      <Menu.Item key="logout">
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <Space className={styles.account}>
        <Avatar
          size="small"
          icon={<img src={UserIcon} alt="" />}
          className={styles.avatar}
          src={currentUser.image_url}
          alt="avatar"
        />
        <span className={`${styles.name} anticon`}>{currentUser.username}</span>
        <DownOutlined className={styles.arrow} />
      </Space>
    </HeaderDropdown>
  );
};

export default AvatarDropdown;
