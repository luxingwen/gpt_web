import React from 'react';
import { Card, Avatar, Typography, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ContentLayout from '@/layouts/index';
import { RightOutlined } from '@ant-design/icons';
import GuanZhu from '@/assets/images/guanzhu.svg';
import RenGongKeFu from '@/assets/images/rengongkefu.svg';

import './index.less';

const { Title, Text } = Typography;

const UserInfo = ({ user }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar size={64} icon={<UserOutlined />} className="user-avatar" />
      <div className="user-details">
        <Title level={4}>{user.nickname}</Title>
        <Text>ID: {user.id}</Text>
        <Text>剩余次数: {user.remaining}</Text>
      </div>
    </div>
  );
};

const listData = [
  {
    title: 'Title 1',
    icon: GuanZhu,
  },
  {
    title: 'Title 2',
    icon: RenGongKeFu,
  },
  // ...
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
  const user = {
    nickname: 'test',
    id: 1,
    remaining: 100,
  };

  return (
    <ContentLayout>
      <Card className="user-info">
        <UserInfo user={user} />
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
