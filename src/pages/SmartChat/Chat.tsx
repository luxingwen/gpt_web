import React, { useEffect, useState } from 'react';

import { getSessionInfo } from '@/service/ai-chat';

import { getSmartSceneInfo } from '@/service/smart-chat';

import Chat from '@/components/ChatBox2/chat';
import PageLoading from '@/components/PageLoading';

interface SmartChatPageProps {
  sceneId: any;
  sessionId?: string;
}

const SmartChatPage: React.FC<SmartChatPageProps> = ({
  sceneId,
  sessionId,
}) => {
  const [sessionInfo, setSessionInfo] = useState<API.ChatSessionInfo>();
  const [scenceInfo, setScenceInfo] = useState<API.SmartSceneInfo>();
  const [scene_uuids, setScene_uuids] = useState<string[]>([]);
  console.log('sceneId:', sceneId);
  console.log('sessionId:', sessionId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('sceneId 11111:', sceneId);
        if (sceneId === 'c' || isNaN(sceneId)) {
          console.log('sceneId 22222:', sceneId);
          const sessionInfo = await getSessionInfo({
            id: parseInt(sessionId),
            chat_type: 'smart-chat',
          });
          if (sessionInfo.errno !== 0) {
            return;
          }

          sceneId = sessionInfo.data.scene_id;
        }

        const resSceneInfo = await getSmartSceneInfo({ id: parseInt(sceneId) });
        console.log('getSmartSceneInfo:', resSceneInfo);

        if (resSceneInfo.errno !== 0) {
          return;
        }

        let scene_uuids_tmp: string[] = [];
        JSON.parse(resSceneInfo.data.params).forEach((item) => {
          scene_uuids_tmp.push(item.uuid);
        });
        console.log('scene_uuids_tmp:', scene_uuids_tmp);
        setScene_uuids(scene_uuids_tmp);

        setScenceInfo(resSceneInfo.data);

        const response = await getSessionInfo({
          scene_id: '' + resSceneInfo.data.id,
          chat_type: 'smart-chat',
          name: resSceneInfo.data.scene_name || '',
        });
        console.log('getSessionInfo:', response);

        if (response.errno !== 0) {
          return;
        }

        setSessionInfo(response.data);
      } catch (error) {
        // 处理错误
      }
    };

    fetchData();
  }, [sceneId, sessionId]);

  return (
    <>
      {/* {sessionInfo ? <ChatBox
        key={sessionId}
        showFullScreen={true}
        showVisitDiscourse={true}
        showOpenNewChat={true}
        sendBtnType="2"
        chat_type="smart-chat"
        session_id={sessionInfo?.id}
        scene_uuids={scene_uuids}
        aiAvatar={scenceInfo?.ai_avatar}
      /> : <PageLoading />} */}

      {sessionInfo ? (
        <Chat
          key={sessionId}
          id={sessionId}
          session_id={sessionId}
          chat_type="smart-chat"
          scene_uuids={scene_uuids}
          aiAvatar={scenceInfo?.ai_avatar} />
      ) : (
        <PageLoading />
      )}
    </>
  );
};

export default SmartChatPage;
