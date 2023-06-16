import React from 'react';

import { history, useModel } from 'umi';

import { BellOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import Avatar from './AvatarDropdown';

import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }
  const turnNotice = () => {
    history.push(`/notice`);
  };

  return (
    <Space className={className}>
      <BellOutlined className={styles.notice} style={{ color: '#666' }} onClick={turnNotice} />
      <Avatar />
    </Space>
  );
};

export default GlobalHeaderRight;
