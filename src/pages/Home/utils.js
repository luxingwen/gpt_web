import { Button } from 'antd';
import React from 'react';
import { message } from 'antd';

export const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
export const getChildrenToRender = (item, i) => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children =
    typeof item.children === 'string' && item.children.match(isImg)
      ? React.createElement('img', { src: item.children, alt: 'img' })
      : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children,
    });
  }
  const messageClick = () => {
    message.info('该功能正在开发中，敬请期待。');
  }

  if (tag == 'a' && item.href == '') {
    return React.createElement(tag, { onClick: messageClick, key: i.toString(), ...item }, children);
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};
