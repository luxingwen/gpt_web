import React from 'react';
import { Menu, Button, Space } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

import './left.less';

const VerticalNav = ({ headerContent, centerContent }) => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRight: '1px solid #000',
      }}
    >
      <div style={{ backgroundColor: '#fff', padding: '16px', color: '#000' }}>
        <div className="top-container">{headerContent}</div>
      </div>
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
          marginBottom: '50px',
        }}
      >
        {centerContent}
      </div>
      <div
        style={{
          backgroundColor: '#fff',
          padding: '16px',
          textAlign: 'center',
          position: 'sticky',
          bottom: 0,
        }}
      >
        <p style={{ margin: 0 }}>
          版权信息 © 2023 Company Name. All Rights Reserved.
        </p>
      </div>
    </div>
  );
};

export default VerticalNav;
