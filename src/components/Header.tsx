import React, { useEffect, useState } from 'react';
import { Layout, Menu, Col, Row, Avatar, Dropdown } from 'antd';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';

import './Header.less';

import logoImage from '../assets/images/logo.png';

import { wxlogin } from '@/service/user';

import { getUserInfo } from '@/service/api';

import storage from '@/utils/storage';

const { Header } = Layout;

const HeaderComponent = () => {
  const [userInfo, setUserInfo] = useState(storage.getItem('userInfo'));

  useEffect(() => {
    getUserInfo().then((res) => {
      console.log('getUserInfo:', res);
      storage.setItem('userInfo', res.data);
      setUserInfo(res.data);
    });
  }, []);

  const location = useLocation();

  const getSelectedKeys = () => {
    const path = location.pathname;
    if (path === '/') return ['home'];
    if (path.startsWith('/ai')) return ['ai'];
    if (path.startsWith('/tips/bag')) return ['bag'];
    if (path.startsWith('/user/info')) return ['user'];
  };

  const hanldelClickLogin = () => {
    console.log('login');
    wxlogin();
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <NavLink to="/user/info" exact activeClassName="active-link">
          我的主页
        </NavLink>
      </Menu.Item>
      <Menu.Item>登出</Menu.Item>
    </Menu>
  );

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
            {userInfo ? (
              <Menu.Item key="user" className="menu-item">
                <Dropdown overlay={userMenu}>
                  <Avatar src={userInfo.avatar} alt="user avatar" />
                </Dropdown>
                {userInfo.name}
              </Menu.Item>
            ) : (
              <Menu.Item
                key="login"
                icon={<LoginOutlined />}
                className="menu-item"
                style={{ float: 'right' }}
                onClick={hanldelClickLogin}
              >
                登录
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderComponent;
