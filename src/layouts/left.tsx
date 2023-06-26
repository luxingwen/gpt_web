import { Layout, Menu, theme } from 'antd';
import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import { history } from '@umijs/max';

import './left.less';

const { Sider } = Layout;

const VerticalNavPropTypes = {
  items: PropTypes.array.isRequired,
  centerContent: PropTypes.node.isRequired,
  defaultSelectedKeys: PropTypes.string.isRequired,
  defaultOpenKeys: PropTypes.string.isRequired,
  setViewContent: PropTypes.func.isRequired,
};

type VerticalNavProps = InferProps<typeof VerticalNavPropTypes>;

const VerticalNav: React.FC<VerticalNavProps> = ({
  items,
  centerContent,
  defaultSelectedKeys,
  defaultOpenKeys,
  setViewContent,
}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Sider
      className="border-r border-gray-300"
      width={200}
      style={{ background: colorBgContainer, position: 'fixed' }}>
      <div style={{ position: 'relative', minHeight: 'calc(100vh - 64px)' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={[defaultSelectedKeys]}
          defaultOpenKeys={[defaultOpenKeys]}
          items={items}
          onClick={(e) => {
            console.log('key:', e.key);
            setViewContent(e.key);
            history.push(`/smart-ai/${e.key}`);
          }}
          style={{ borderRight: 'none' }}
        />
        <div style={{ marginTop: '12px', marginBottom: '12px' }}>
          {centerContent}
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '10px',
            background: '#f0f2f5',
            textAlign: 'center',
          }}
        >
          <p style={{ margin: 0 }}>
            copyright@AI云助手
          </p>
        </div>
      </div>
    </Sider>
  );
};

export default VerticalNav;
