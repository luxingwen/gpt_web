import React from 'react';
import { Layout, Menu, Col, Row } from 'antd';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
} from '@ant-design/icons';

import './Header.less';

import logoImage from '../assets/images/logo.png'

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header className="header">
      <Row justify="space-between" align="middle" >
        <Col span={4}>
          <div className="logo">
            <img src={logoImage} alt="Logo" />
            <span className="logo-name">AI百宝助手</span>
          </div>
        </Col>
        <Col span={16}>
          <Menu theme="light" mode="horizontal" defaultSelectedKeys={['home']} className="menu">
            <Menu.Item key="home" icon={<HomeOutlined />} className="menu-item">
              首页
            </Menu.Item>
            <Menu.Item key="ai" icon={<QuestionCircleOutlined />} className="menu-item">
              AI问答
            </Menu.Item>
            <Menu.Item key="bag" icon={<ShoppingCartOutlined />} className="menu-item">
              百宝袋
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          <Menu theme="light" mode="horizontal" className="menu">
            <Menu.Item key="login" icon={<LoginOutlined />} className="menu-item" style={{ float: 'right' }}>
              登录
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
