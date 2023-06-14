import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, message } from 'antd';

function Slot(props) {
  // 接收children属性
  const { children } = props;

  return (
    <div>
      {/* 使用 children属性进行占位，如果有内容就渲染传入的内容*/}
      {children}
    </div>
  );
}

export default Slot;
