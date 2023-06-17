/*
 * @Author: Draco draco.coder@gmail.com
 * @Date: 2023-06-17 10:32:47
 * @LastEditors: Draco draco.coder@gmail.com
 * @LastEditTime: 2023-06-17 12:49:03
 * @FilePath: /gpt_web/src/pages/SmartChat/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import HistorySession from '@/components/HistorySession/HistorySession';
import LeftNav from '@/layouts/left';
import { LaptopOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Layout, Typography } from 'antd';
import React, { useState } from 'react';
import Chat from './Chat';
import CreateScene from './CreateScence';
import SceneList from './SceneList';

const { Header, Content, Sider } = Layout;

const { Title } = Typography;

const SmartChatPage: React.FC = () => {
  const [cardData, setCardData] = useState([]);
  const [viewContent, setViewContent] = useState('scene_list');

  const items: MenuProps['items'] = [
    { key: 'scence-list', icon: <UserOutlined />, label: '场景广场' },
    { key: 'scence-create', icon: <LaptopOutlined />, label: '创建场景' },
  ];

  return (
    <Layout  className='flex -mt-6 -mx-10'>
      <Layout style={{ padding: 0 }}>
        <LeftNav
          items={items}
          centerContent={<HistorySession></HistorySession>}
          defaultSelectedKeys={'scence-list'}
          defaultOpenKeys={'scence-list'}
          setViewContent={setViewContent}
        ></LeftNav>

        <Content>
          {viewContent === 'scence-list' && (
            <SceneList setViewContent={setViewContent}></SceneList>
          )}
          {viewContent === 'scence-create' && (
            <CreateScene setViewContent={setViewContent}></CreateScene>
          )}
          {viewContent === 'chat' && <Chat></Chat>}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SmartChatPage;
