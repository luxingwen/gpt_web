import ChatBox from '@/components/ChatBox/Index';
import { PageContainer } from '@ant-design/pro-layout';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './index.less';
import {
  getPromptScenesInfo,
} from '@/service/api';

const ChatPage = () => {


  const { scene } = useParams();

  const [sceneInfo, setSceneInfo] = useState({});
  const [isExampleModalVisible, setIsExampleModalVisible] = useState(false);


  const handleExample = () => {
    setIsExampleModalVisible(true);
  };

  const handleExampleOk = () => {
    setIsExampleModalVisible(false);
  };

  const handleExampleCopy = () => {
    console.log('复制成功');
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPromptScenesInfo({ scene });
        console.log("getPromptScenesInfo:", response);

        if (response.errno !== 0) {
          return;
        }

        setSceneInfo(response.data);
      } catch (error) {
        // 处理错误
      }
    };

    fetchData();
  }, [scene]);

  return (
    <PageContainer title={false} breadcrumb={false}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="chat-example-header">
          <div className="left-content">
            <h2>{sceneInfo.name}</h2>
          </div>
          <div className="right-content">

            <Button onClick={handleExample}>示例</Button>
          </div>
        </div>
      </div>

      <Modal title="示例如下" visible={isExampleModalVisible} footer={null} onCancel={handleExampleOk}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>可以这样子提问</h2>
          <CopyToClipboard text={sceneInfo.question} onCopy={handleExampleCopy}>
            <Button>复制</Button>
          </CopyToClipboard>
        </div>
        <div>
          <p>{sceneInfo.question}</p>
        </div>
        <Button
          type="primary"
          onClick={handleExampleOk}
          style={{ marginTop: '24px' }}
        >
          我明白了
        </Button>
      </Modal>

      <ChatBox
        showFullScreen={true}
        showVisitDiscourse={true}
        showOpenNewChat={true}
        sendBtnType="2"
        scene={scene}
        chat_type="prompt-chat"
        showVisitDiscourse={false}
        showOpenNewChat={false}
      />
    </PageContainer>
  );
};
export default ChatPage;
