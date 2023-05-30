import React from 'react';
import { Layout, Row, Col } from 'antd';

import './Container.less';

const { Content } = Layout;

const Container = ({ children }) => {
  return (
    <Layout className="container">
      <Content>
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            {children}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Container;
