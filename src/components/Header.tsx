import React, { useEffect, useState } from 'react';
import {
  Layout,
  Menu,
  Col,
  Row,
  Avatar,
  Dropdown,
  Button,
  Typography,
} from 'antd';

import Sidebar from 'react-sidebar';
import styled from 'styled-components';
import {
  HomeOutlined,
  QuestionCircleOutlined,
  ShoppingCartOutlined,
  LoginOutlined,
  MenuOutlined,
} from '@ant-design/icons';
import { NavLink, useLocation } from 'react-router-dom';

import './Header.less';

import logoImage from '../assets/images/logo.png';

import { wxlogin } from '@/service/user';

import { getUserInfo } from '@/service/api';

import storage from '@/utils/storage';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';

const { Header } = Layout;
const { Text } = Typography;

const SidebarMenuContainer = styled.div`
  display: flex;
  width: 120px;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  margin-top: 20px;
`;

const NavLinkStyled = styled(NavLink)`
  margin-bottom: 12px;
  color: #333;
  text-decoration: none;

  &.active-link {
    font-weight: bold;
    color: #1890ff;
  }
`;

const SidebarMenu = () => (
  <SidebarMenuContainer>
    <NavLinkStyled to="/" activeClassName="active-link">
      <HomeOutlined /> 首页
    </NavLinkStyled>
    <NavLinkStyled to="/ai" activeClassName="active-link">
      <QuestionCircleOutlined /> AI问答
    </NavLinkStyled>
    <NavLinkStyled to="/tips/bag" activeClassName="active-link">
      <ShoppingCartOutlined /> 百宝袋
    </NavLinkStyled>
  </SidebarMenuContainer>
);

const AvatarContainer = styled.div`
  display: flex;
  align-items: center;
`;

const AvatarImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  margin-right: 8px;
`;

const defaultToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMTE5IiwiZXhwIjoxNzA0NDYyMzk1LCJpYXQiOjE2ODU3MTM1OTUsImlzcyI6InRlc3QifQ.jfVomRADsD1IaiEjV37Ovvjuukzarflqx_BFDo0kG5o';

const HeaderComponent = () => {
  const history = useHistory();
  const [userInfo, setUserInfo] = useState(storage.getItem('userInfo'));
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleLogoClick = () => setSidebarOpen(true);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    getUserInfo().then((res) => {
      if (res.code === 0) {
        setUserInfo(res.data);
      }
    });

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getUserInfo().then((res) => {
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

  const handleClickLogin = () => {
    console.log('login');
    wxlogin();

    // Cookies.set('token', defaultToken);

    // getUserInfo().then((res) => {
    //   setUserInfo(res.data);
    // });
  };

  const handleLogout = () => {
    console.log('logout');
    storage.removeItem('userInfo');
    Cookies.remove('token');
    setUserInfo(null);
    history.push('/');
  };

  const userMenu = (
    <Menu>
      <Menu.Item>
        <NavLink to="/user/info" exact activeClassName="active-link">
          我的主页
        </NavLink>
      </Menu.Item>
      <Menu.Item onClick={handleLogout}>登出</Menu.Item>
    </Menu>
  );

  const smallScreen = windowWidth <= 768;

  const headerAvatar = () => {
    return !smallScreen ? (
      <Menu.Item key="user" className="menu-item">
        <Dropdown overlay={userMenu}>
          <AvatarContainer>
            <AvatarImage src={userInfo.avatar} alt="user avatar" />
            {!smallScreen && (
              <Text style={{ marginLeft: '2px' }}> {userInfo.nickname} </Text>
            )}
          </AvatarContainer>
        </Dropdown>
      </Menu.Item>
    ) : (
      <Dropdown overlay={userMenu}>
        <AvatarContainer>
          <AvatarImage src={userInfo.avatar} alt="user avatar" />
          {!smallScreen && (
            <Text style={{ marginLeft: '2px' }}> {userInfo.nickname} </Text>
          )}
        </AvatarContainer>
      </Dropdown>
    );
  };

  const headerContent = (
    <Header className="header">
      <Row justify="space-between" align="middle">
        <Col span={4}>
          {smallScreen ? (
            <Button onClick={handleLogoClick} icon={<MenuOutlined />} />
          ) : (
            <div
              className="logo"
              onClick={smallScreen ? handleLogoClick : undefined}
            >
              <img src={logoImage} alt="Logo" />
              <span className="logo-name">AI百宝助手</span>
            </div>
          )}
        </Col>
        {!smallScreen && (
          <Col span={16}>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={['home']}
              selectedKeys={getSelectedKeys()}
              className="menu"
            >
              <Menu.Item
                key="home"
                icon={<HomeOutlined />}
                className="menu-item"
              >
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

              {/* <Menu.Item
                key="smart-scene"
                icon={<ShoppingCartOutlined />}
                className="menu-item"
              >
                <NavLink to="/smart-chat/scene" activeClassName="active-link">
                  个人知识库
                </NavLink>
              </Menu.Item> */}
            </Menu>
          </Col>
        )}
        <Col span={4}>
          <Menu theme="light" mode="horizontal" className="menu">
            {userInfo ? (
              headerAvatar()
            ) : (
              <Menu.Item
                key="login"
                icon={<LoginOutlined />}
                className="menu-item"
                style={{ float: 'right' }}
                onClick={handleClickLogin}
              >
                登录
              </Menu.Item>
            )}
          </Menu>
        </Col>
      </Row>
    </Header>
  );

  console.log('smallScreen:', smallScreen);

  return smallScreen ? (
    <Sidebar
      sidebar={<SidebarMenu />}
      open={sidebarOpen}
      onSetOpen={setSidebarOpen}
      styles={{ sidebar: { background: 'white' } }}
    >
      {headerContent}
    </Sidebar>
  ) : (
    headerContent
  );
};

export default HeaderComponent;
