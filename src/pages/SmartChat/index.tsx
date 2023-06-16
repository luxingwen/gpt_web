import HeaderComponent from '@/components/Header';
import { getLatestUsedScenes } from '@/service/api';
import { Col, Layout, Row, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Chat from './Chat';
import CreateScene from './CreateScence';
import LeftNav from './LeftNav';
import SceneList from './SceneList';

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
