import React, { useState } from 'react';

import { Card } from 'antd';

const TipsCard = ({
  title,
  description,
  style = {
    height: '120px',
    overflow: 'hidden', // 隐藏超出部分
    textOverflow: 'ellipsis', // 超出部分用...代替
  },
}) => {
  const cardStyle = {
    borderRadius: '10px', // 设置边框弧度
    ...style, // 传入的style覆盖默认样式
  };

  const titleStyle = {
    fontSize: '18px', // 设置标题字体大小
    fontWeight: 'bold', // 设置标题字体粗细
  };

  const descriptionStyle = {
    fontSize: '14px', // 设置描述字体大小
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2, // 限制在一个块元素显示的文本的行数。
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
  };

  return (
    <Card style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={descriptionStyle}>{description}</div>
    </Card>
  );
};

export default TipsCard;
