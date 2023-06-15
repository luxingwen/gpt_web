import React, { useState } from 'react';
import { Card, Row, Col, Button, Modal, message, Spin } from 'antd';
import { EditOutlined, DeleteOutlined, EnterOutlined } from '@ant-design/icons';
import { deleteSmartScene } from '@/service/smart_chat';

import './SceneItemCard.less';

interface SceneItemCardProps {
  sceneInfo: API.ChatSmartScene;
  deleteScene: (id: number) => void;
  setViewContent: (content: string) => void;
}

const SceneItemCard: React.FC<SceneItemCardProps> = ({
  sceneInfo,
  deleteScene,
  setViewContent,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 处理确认删除逻辑
    setIsLoading(true); // 开始加载

    try {
      // 调用删除接口
      deleteSmartScene({ id: sceneInfo.id })
        .then((res) => {
          console.log('deleteSmartScene', res);
          if (res.errno === 0) {
            setIsModalVisible(false);
            message.success('删除成功');
            deleteScene(sceneInfo.id);
          } else {
            message.error('删除失败');
          }
        })
        .catch((err) => {
          console.log('deleteSmartScene err', err);
          message.error('删除失败');
        })
        .finally(() => {
          setIsLoading(false); // 加载完成
        });
    } catch (error) {
      // 处理删除失败的情况
      message.error('删除失败');
      setIsLoading(false); // 加载完成
    } finally {
      setIsLoading(false); // 加载完成
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const modalFooter = [
    <Button key="cancel" onClick={handleCancel}>
      取消
    </Button>,
    <Button key="delete" type="primary" danger onClick={handleOk}>
      {isLoading ? <Spin size="small" /> : '删除'}
    </Button>,
  ];

  return (
    <Card style={{ borderRadius: '22px', margin: '4px' }}>
      <Row>
        <Col span={8}>
          <div>
            <h3>场景名称</h3>
            <p>{sceneInfo.scene_name}</p>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <p>创建时间</p>
            <p>{sceneInfo.create_time}</p>
          </div>
        </Col>
        <Col span={8}>
          <div>
            <Button
              type="primary"
              icon={<EnterOutlined />}
              style={{ marginRight: '8px' }}
              onClick={() => {
                setViewContent('chat');
              }}
            >
              进入对话
            </Button>
            <Button icon={<EditOutlined />} style={{ marginRight: '8px' }}>
              编辑
            </Button>
            <Button type="danger" icon={<DeleteOutlined />} onClick={showModal}>
              删除
            </Button>
            <Modal
              title="确认删除"
              visible={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              className="custom-modal"
              footer={modalFooter}
            >
              <p>删除后您的上传的资料也会删除，确定删除？</p>
            </Modal>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default SceneItemCard;
