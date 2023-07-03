import { Menu } from 'antd';
import TweenOne from 'rc-tween-one';
import React, { useState } from 'react';
import { getChildrenToRender } from './utils';
import { useModel } from '@umijs/max';
import HeaderDropdown from '@/components/HeaderDropdown';
import { history } from '@umijs/max';
import { LogoutOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Space } from 'antd';
import { logout, wxlogin } from '@/service/user';
import Cookies from 'js-cookie';

const { Item, SubMenu } = Menu;

const Header = (props) => {

  const { dataSource, isMobile } = props;
  const [phoneOpen, setPhoneOpen] = useState(undefined);

  const phoneClick = () => {
    setPhoneOpen(!phoneOpen);
  };

  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;


  console.log("home currentUser:", currentUser);

  const handleLogout = () => {
    Cookies.remove('token');
    setInitialState({
      ...initialState,
      currentUser: undefined,
    });
  };


  const loginMenu = () => {
    return {
      href: '#',
      children: [
        {
          children: (
            currentUser ? (
              <HeaderDropdown
                menu={{
                  selectedKeys: [],
                  onClick: (event) => {
                    const { key } = event;
                    console.log(key);
                    if (key === 'center') {
                      history.push('/user/account')
                    }
                    if (key === 'logout') {
                      handleLogout();
                    }
                  },
                  items: [
                    {
                      key: 'center',
                      icon: <UserOutlined />,
                      label: '个人中心',
                    },
                    {
                      key: 'settings',
                      icon: <SettingOutlined />,
                      label: '个人设置',
                    },
                    {
                      type: 'divider',
                    },
                    {
                      key: 'logout',
                      icon: <LogoutOutlined />,
                      label: '退出登录',
                    },
                  ],
                }}
              >
                <Space>
                  <Avatar src={currentUser.avatar}></Avatar>
                  <span>{currentUser.nickname}</span>
                </Space>
              </HeaderDropdown>
            )
              : (
                <span onClick={wxlogin()}>
                  <span>
                    <span>
                      <span>
                        <span>
                          <span>
                            <span>
                              <p>登录</p>
                            </span>
                          </span>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>)
          ),
          name: 'text',
          className: 'litynf4fhpk-editor_css',
        },
      ],
    };
  }


  dataSource.Menu.children.forEach((item) => {
    console.log("item name:", item.name);
    if (item.name === 'item~login') {
      //item.children = loginMenu();
    }
  });

  const navData = dataSource.Menu.children;
  const navChildren = navData.map((item) => {
    const { children: a, subItem, ...itemProps } = item;
    if (subItem) {
      return (
        <SubMenu
          key={item.name}
          {...itemProps}
          title={
            <div
              {...a}
              className={`header0-item-block ${a.className}`.trim()}
            >
              {a.children.map(getChildrenToRender)}
            </div>
          }
          popupClassName="header0-item-child"
        >
          {subItem.map(($item, ii) => {
            const { children: childItem } = $item;
            const child = childItem.href ? (
              <a {...childItem}>
                {childItem.children.map(getChildrenToRender)}
              </a>
            ) : (
              <div {...childItem}>
                {childItem.children.map(getChildrenToRender)}
              </div>
            );
            return (
              <Item key={$item.name || ii.toString()} {...$item}>
                {child}
              </Item>
            );
          })}
        </SubMenu>
      );
    }
    return (
      <Item key={item.name} {...itemProps}>
        <a {...a} className={`header0-item-block ${a.className}`.trim()}>
          {a.children.map(getChildrenToRender)}
        </a>
      </Item>
    );
  });

  const moment = phoneOpen === undefined ? 300 : null;

  return (
    <TweenOne
      component="header"
      animation={{ opacity: 0, type: 'from' }}
      {...dataSource.wrapper}
      {...props}
    >
      <div
        {...dataSource.page}
        className={`${dataSource.page.className}${phoneOpen ? ' open' : ''}`}
      >
        <TweenOne
          animation={{ x: -30, type: 'from', ease: 'easeOutQuad' }}
          {...dataSource.logo}
        >
          <img width="100%" src={dataSource.logo.children} alt="img" />
        </TweenOne>
        {isMobile && (
          <div
            {...dataSource.mobileMenu}
            onClick={() => {
              phoneClick();
            }}
          >
            <em />
            <em />
            <em />
          </div>
        )}
        <TweenOne
          {...dataSource.Menu}
          animation={
            isMobile
              ? {
                height: 0,
                duration: 300,
                onComplete: (e) => {
                  if (phoneOpen) {
                    e.target.style.height = 'auto';
                  }
                },
                ease: 'easeInOutQuad',
              }
              : null
          }
          moment={moment}
          reverse={!!phoneOpen}
        >
          <Menu
            mode={isMobile ? 'inline' : 'horizontal'}
            defaultSelectedKeys={['sub0']}
            theme="dark"
            items={navChildren}
          >
          </Menu>
        </TweenOne>
      </div>
    </TweenOne>
  );
};

export default Header;
