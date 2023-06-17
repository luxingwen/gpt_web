import { PageContainer } from "@ant-design/pro-layout";
import ChatBox from "@/components/ChatBox/Index";
import React, { useEffect, useState } from "react";

import { getSessionInfo } from '@/service/ai-chat';

import { getSmartSceneInfo } from '@/service/smart-chat';




interface SmartChatPageProps {
  sceneId: number;
  sessionId?: string;
}

const SmartChatPage: React.FC<SmartChatPageProps> = ({ sceneId, sessionId }) => {

  const [sessionInfo, setSessionInfo] = useState<API.ChatSessionInfo>();
  console.log("sceneId:", sceneId);
  console.log("sessionId:", sessionId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resSceneInfo = await getSmartSceneInfo({ id: sceneId });
        console.log("getSmartSceneInfo:", resSceneInfo);

        if (resSceneInfo.errno !== 0) {
          return;
        }

        const response = await getSessionInfo({
          scene_id: resSceneInfo.data.scene_id,
          chat_type: 'smart-chat',
          name: resSceneInfo.data.scene_name || '',
        });
        console.log("getSessionInfo:", response);

        if (response.errno !== 0) {
          return;
        }

        setSessionInfo(response.data);
      } catch (error) {
        // 处理错误
      }
    };

    fetchData();
  }, [sceneId]);



  return (
    <PageContainer title={false} breadcrumb={false} >
      <ChatBox
        showFullScreen={true}
        showVisitDiscourse={true}
        showOpenNewChat={true}
        sendBtnType="2"
      />
    </PageContainer>
  );
};

export default SmartChatPage;
