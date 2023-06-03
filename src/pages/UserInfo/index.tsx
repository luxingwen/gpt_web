import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Space, Modal, Image } from 'antd';
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

import { NavLink, useLocation } from 'react-router-dom';
import Qrcode from '@/assets/images/qrcode.jpg';

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
  const [isGuanZhuModalVisible, setIsGuanZhuModalVisible] = useState(false);
  const [guanzhuImage, setGuanzhuImage] = useState('');

  const handleGuanZhuClick = () => {
    setGuanzhuImage(Qrcode); // 设置你要显示的图片URL
    setIsGuanZhuModalVisible(true); // 显示Modal
  };

  const handleGuanZhuModalClose = () => {
    setIsGuanZhuModalVisible(false); // 隐藏Modal
  };

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
        <NavLink to="/user/goods">
          <MenuItem
            item={{
              title: '获取更多次数',
              icon: Xufei,
            }}
            onClick={() => console.log(`Item 获取更多次数  clicked`)}
          />
        </NavLink>
        <MenuItem
          item={{
            title: '人工客服',
            icon: RenGongKeFu,
          }}
          onClick={() => console.log(`Item 人工客服 clicked`)}
        />
        <MenuItem
          item={{
            title: '关注公众号防走失',
            icon: GuanZhu,
          }}
          onClick={handleGuanZhuClick}
        />
        <MenuItem
          item={{
            title: '邀请奖励',
            icon: Yaoqing,
          }}
          onClick={() => console.log(`Item 邀请奖励 clicked`)}
        />

        <MenuItem
          item={{
            title: '口令兑换/加入社群',
            icon: Exchange,
          }}
          onClick={() => console.log(`Item 口令兑换/加入社群 clicked`)}
        />
      </Card>

      <Modal
        title="关注公众号防走失"
        visible={isGuanZhuModalVisible}
        onCancel={handleGuanZhuModalClose}
        footer={null}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image width={200} src={guanzhuImage} />
        </div>
      </Modal>
    </ContentLayout>
  );
};

export default UserInfoPage;
