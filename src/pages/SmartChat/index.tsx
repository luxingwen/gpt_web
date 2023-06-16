import { getLatestUsedScenes } from '@/service/api';
import { Col, Layout, Row, Typography, message, Menu, theme } from 'antd';
import React, { useEffect, useState } from 'react';
import Chat from './Chat';
import CreateScene from './CreateScence';
import LeftNav from './LeftNav';
import SceneList from './SceneList';
import type { MenuProps } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import HistorySession from '@/components/HistorySession/HistorySession';
import { ProCard } from '@ant-design/pro-components';

const { Header, Content, Sider } = Layout;

const { Title } = Typography;

const items2: MenuProps['items'] = [
  { key: 'scence-list', icon: <UserOutlined />, label: '场景广场' },
  { key: 'scence-create', icon: <LaptopOutlined />, label: '创建场景' },
];

const SmartChatPage: React.FC = () => {
  const [cardData, setCardData] = useState([]);
  const [viewContent, setViewContent] = useState('scene_list');

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    // <Layout style={{ display: 'flex' }}>
    //   <Layout style={{ padding: 0, minHeight: '100vh' }}>
    //     <Sider width={200} style={{ background: colorBgContainer }}>
    //       <Menu
    //         mode="inline"
    //         defaultSelectedKeys={['scence-list']}
    //         defaultOpenKeys={['scence-list']}
    //         items={items2}
    //       />
    //       <HistorySession></HistorySession>
    //     </Sider>
    //     <Layout style={{ padding: 0 }}>
    //       <Content>
    //         {viewContent == 'scene_list' && (
    //           <SceneList setViewContent={setViewContent}></SceneList>
    //         )}
    //         {viewContent == 'create_scene' && (
    //           <CreateScene setViewContent={setViewContent}></CreateScene>
    //         )}
    //         {viewContent == 'chat' && <Chat></Chat>}
    //       </Content>
    //     </Layout>
    //   </Layout>
    // </Layout>

    <ProCard split="vertical">
      <ProCard title="左侧详情" colSpan="20%">
        <Menu
          mode="inline"
          defaultSelectedKeys={['scence-list']}
          defaultOpenKeys={['scence-list']}
          items={items2}
        />
        <HistorySession></HistorySession>
      </ProCard>
      <ProCard >
        <div style={{ height: 360 }}>右侧内容</div>
      </ProCard>
    </ProCard>
  );
}

export default SmartChatPage;
