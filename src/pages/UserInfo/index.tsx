import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ContentLayout from '@/layouts/index';
import { RightOutlined } from '@ant-design/icons';
import GuanZhu from '@/assets/images/guanzhu.svg';
import RenGongKeFu from '@/assets/images/rengongkefu.svg';
import Xufei from '@/assets/images/xufei.svg';
import Yaoqing from '@/assets/images/yaoqing.svg';
import Exchange from '@/assets/images/exchange.svg';
import storage from '@/utils/storage';

import { getUserInfo } from '@/service/api';

import './index.less';

const { Title, Text } = Typography;

const UserInfo = ({ user }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar size={64} src={user.avatar} className="user-avatar" />
      <div className="user-details">
        <Title level={4}>{user.nickname}</Title>
        <Text>ID: {user.id}</Text>
        <Text>剩余次数: {user.chat_times}</Text>
      </div>
    </div>
  );
};

const listData = [
  {
    title: '获取更多次数',
    icon: Xufei,
  },
  {
    title: '人工客服',
    icon: RenGongKeFu,
  },
  {
    title: '关注公众号防走失',
    icon: GuanZhu,
  },
  {
    title: '邀请奖励',
    icon: Yaoqing,
  },
  {
    title: '口令兑换/加入社群',
    icon: Exchange,
  },
];

const IconText = ({ icon, text }) => (
  <Space>
    <img src={icon} />
    {text}
  </Space>
);

const MenuItem = ({ item, onClick }) => (
  <div className="user-menu-item" onClick={onClick}>
    <IconText icon={item.icon} text={item.title} />
    <RightOutlined />
  </div>
);

const UserInfoPage = () => {
  const [userInfo, setUserInfo] = useState(storage.getItem('userInfo'));

  useEffect(() => {
    getUserInfo().then((res) => {
      console.log('getUserInfo:', res);
      storage.setItem('userInfo', res.data);
      setUserInfo(res.data);
    });
  }, []);

  return (
    <ContentLayout>
      <Card className="user-info">
        <UserInfo user={userInfo} />
      </Card>

      <Card style={{ marginTop: '24px' }}>
        {listData.map((item, index) => (
          <MenuItem
            key={index}
            item={item}
            onClick={() => console.log(`Item ${index} clicked`)}
          />
        ))}
      </Card>
    </ContentLayout>
  );
};

export default UserInfoPage;
