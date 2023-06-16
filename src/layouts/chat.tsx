import React from 'react';
import { Layout, Row, Col } from 'antd';
import HeaderComponent from '../components/Header';
import ContainerComponent from '../components/Container';

import './chat.less';

const { Content } = Layout;

const ChatLayout = ({ children }) => {
  return (
    <Layout style={{ overflow: 'hidden' }}>
      <HeaderComponent />
      <ContainerComponent>
        <div style={{ width: '75%', margin: '0 auto', padding: '10px' }}>
          {children}
        </div>
      </ContainerComponent>
    </Layout>
  );
};

export default ChatLayout;
