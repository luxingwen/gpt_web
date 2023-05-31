import React from 'react';
import { Layout, Menu, Col, Row } from 'antd';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';

import './Header.less';

import logoImage from '../assets/images/logo.png';

const { Header } = Layout;

const HeaderComponent = () => {
  const location = useLocation();

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path === '/') return ['home'];
    if (path.startsWith('/ai')) return ['ai'];
    if (path.startsWith('/tips/bag')) return ['bag'];
  };

  return (
    <Header className="header">
      <Row justify="space-between" align="middle">
        <Col span={4}>
          <div className="logo">
            <img src={logoImage} alt="Logo" />
            <span className="logo-name">AI百宝助手</span>
          </div>
        </Col>
        <Col span={16}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={['home']}
            selectedKeys={getSelectedKeys()}
            className="menu"
          >
            <Menu.Item key="home" icon={<HomeOutlined />} className="menu-item">
              <NavLink to="/" exact activeClassName="active-link">
                首页
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="ai"
              icon={<QuestionCircleOutlined />}
              className="menu-item"
            >
              <NavLink to="/ai" activeClassName="active-link">
                AI问答
              </NavLink>
            </Menu.Item>
            <Menu.Item
              key="bag"
              icon={<ShoppingCartOutlined />}
              className="menu-item"
            >
              <NavLink to="/tips/bag" activeClassName="active-link">
                百宝袋
              </NavLink>
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={4}>
          <Menu theme="light" mode="horizontal" className="menu">
            <Menu.Item
              key="login"
              icon={<LoginOutlined />}
              className="menu-item"
              style={{ float: 'right' }}
            >
              登录
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
