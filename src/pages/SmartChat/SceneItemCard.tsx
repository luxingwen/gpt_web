import React from 'react';
import { Card, Row, Col, Button } from 'antd';
import { EditOutlined, DeleteOutlined, EnterOutlined } from '@ant-design/icons';

const SceneItemCard = ({ title, createTime }) => {
  return (
    <Card style={{ borderRadius: '22px', margin: '4px' }}>
      <Row>
        <Col span={8}>
          <div>
            <h3>场景名称</h3>
            <p>{title}</p>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <p>创建时间</p>
            <p>{createTime}</p>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <Button
              type="primary"
              icon={<EnterOutlined />}
              style={{ marginRight: '8px' }}
            >
              进入对话
            </Button>
            <Button icon={<EditOutlined />} style={{ marginRight: '8px' }}>
              编辑
            </Button>
            <Button type="danger" icon={<DeleteOutlined />}>
              删除
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default SceneItemCard;
