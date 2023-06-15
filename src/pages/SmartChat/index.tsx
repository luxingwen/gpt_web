import styles from './index.less';
import { Layout, Row, Col, Card, Typography, message } from 'antd';
import HeaderComponent from '@/components/Header';
import ContentLayout from '@/layouts/index';
import TipsCard from '@/components/TipsCard';
import HomeImg1 from '@/assets/images/home-img-1.png';
import HomeImg2 from '@/assets/images/home-img-2.png';
import { getLatestUsedScenes } from '@/service/api';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import LeftNav from './LeftNav';
import SceneList from './SceneList';
import CreateScene from './CreateScence';
import Chat from './Chat';

const { Header, Content, Footer } = Layout;

import storage from '@/utils/storage';

const { Title } = Typography;

export default function IndexPage() {
  const headerHeight = 64; // 假设 Header 的高度为 64px
  const history = useHistory();
  const [cardData, setCardData] = useState([]);
  const [userInfo, setUserInfo] = useState(storage.getItem('userInfo'));

  const [viewContent, setViewContent] = useState('scene_list'); // 用于展示的内容

  useEffect(() => {
    getLatestUsedScenes()
      .then((res) => {
        console.log('getLatestUsedScenes', res.data);
        setCardData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleHotCardClick = () => {
    history.push(`/tips/bag`);
  };

  const handleGiftCardClick = () => {
    if (!userInfo) {
      message.error('请先登录');
      return;
    }
    history.push(`/user/redemption`);
  };

  return (
    <Layout style={{ display: 'flex' }}>
      <Header style={{ background: '#fff' }}>
        <HeaderComponent />
      </Header>
      <Content style={{ flex: 1 }}>
        <Row style={{ height: `calc(100vh - ${headerHeight}px)` }}>
          <Col span={4}>
            <LeftNav setViewContent={setViewContent} />
          </Col>
          <Col span={20}>
            {viewContent == 'scene_list' && (
              <SceneList setViewContent={setViewContent}></SceneList>
            )}
            {viewContent == 'create_scene' && (
              <CreateScene setViewContent={setViewContent}></CreateScene>
            )}
            {viewContent == 'chat' && <Chat></Chat>}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
}
