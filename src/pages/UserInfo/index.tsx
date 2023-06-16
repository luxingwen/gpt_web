import Exchange from '@/assets/images/exchange.svg';
import GuanZhu from '@/assets/images/guanzhu.svg';
import RenGongKeFu from '@/assets/images/rengongkefu.svg';
import vipImg from '@/assets/images/vip.jpg';
import Xufei from '@/assets/images/xufei.svg';
import Yaoqing from '@/assets/images/yaoqing.svg';
import storage from '@/utils/storage';
import { RightOutlined } from '@ant-design/icons';
import {
  Avatar,
  Card,
  Image,
  Layout,
  Modal,
  Space,
  Typography,
  message,
} from 'antd';
import { useEffect, useState } from 'react';

import Qrcode from '@/assets/images/qrcode.jpg';
import { getUserInfo } from '@/service/user';
import { NavLink } from 'react-router-dom';

import { formatTimestamp, getCurrentTimestampInSeconds } from '@/utils/utils';

import { wxlogin } from '@/service/user';
import './index.less';

const { Title, Text } = Typography;
const { Content } = Layout;

const UserInfo = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar size={64} src={user.avatar} className="user-avatar" />
      <div className="user-details">
        <Title level={4}>{user.nickname}</Title>
        <Text>ID: {user.id}</Text>
        {getCurrentTimestampInSeconds() > user.chat_expired_at && (
          <Text>剩余次数: {user.chat_times}</Text>
        )}
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
      if (res.errno === 401) {
        message.error('请先登录');
        wxlogin();
        return;
      }
      if (res.errno == 0) {
        storage.setItem('userInfo', res.data);
        setUserInfo(res.data);
      }
    });
  }, []);

  if (!userInfo) {
    return null;
  }

  return (
    <div className="user-info-page">
      <Content className="user-info-content">
        <Card className="user-info">
          <UserInfo user={userInfo} />
        </Card>

        {userInfo.is_vip && (
          <Card
            className="custom-vip-card"
            style={{ marginTop: '24px', position: 'relative' }}
          >
            <img
              src={vipImg}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div className="custom-vip-text">
              {formatTimestamp(userInfo.chat_expired_at)} 到期
            </div>
          </Card>
        )}

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
          <NavLink to="/user/invitation">
            <MenuItem
              item={{
                title: '邀请奖励',
                icon: Yaoqing,
              }}
              onClick={() => console.log(`Item 邀请奖励 clicked`)}
            />
          </NavLink>

          <NavLink to="/user/redemption">
            <MenuItem
              item={{
                title: '口令兑换/加入社群',
                icon: Exchange,
              }}
              onClick={() => console.log(`Item 口令兑换/加入社群 clicked`)}
            />
          </NavLink>
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
      </Content>
    </div>
  );
};

export default UserInfoPage;
