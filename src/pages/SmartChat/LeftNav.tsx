import React from 'react';
import { Menu, Button, Space } from 'antd';
import { HomeOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';

import './LeftNav.less';

const VerticalNav = ({ setViewContent }) => {
  const handleSceneButtonClick = (content) => {
    setViewContent(content);
  };

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
        <div className="top-container">
          <div className="button-container">
            <button
              className="custom-button"
              onClick={() => handleSceneButtonClick('scene_list')}
            >
              场景广场
            </button>
            <button
              className="custom-button"
              onClick={() => handleSceneButtonClick('create_scene')}
            >
              创建新场景
            </button>
          </div>
        </div>
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
      ></div>
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
