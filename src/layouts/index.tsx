import React from 'react';
import { Layout, Row, Col } from 'antd';
import HeaderComponent from '../components/Header';
import ContainerComponent from '../components/Container';

const MyLayout = ({ children }) => {
  return (
    <Layout>
      <HeaderComponent />
      <ContainerComponent>{children}</ContainerComponent>
    </Layout>
  );
};

export default MyLayout;
