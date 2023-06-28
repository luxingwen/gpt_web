import ChatBox from '@/components/ChatBox/Index';
import { PageContainer } from '@ant-design/pro-layout';
import './index.less';
import Chat from '@/components/ChatBox2/chat';
import AiAvatar from '@/assets/images/logo.png';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { newChatSession } from '@/service/ai-chat/index';
import { message } from 'antd';


const ChatPage = () => {

  const { id } = useParams<{ id: string }>();
  const [sessionId, setSessionId] = useState<number>(0);

  useEffect(() => {
    console.log("id:", id);
    if (id === "" || id === undefined || id === null) {
      newChatSession({
        chat_type: 'ai-chat',
        scene_id: '0',
      }).then((res) => {
        if (res.errno === 0) {
          setSessionId(res.data.id);
        } else {
          message.error("创建会话失败");
        }
      });
    } else {
      setSessionId(parseInt(id));
    }
  }, [id]);


  return (
    <PageContainer title={false} breadcrumb={false}>
      {/* <ChatBox
        showFullScreen={true}
        showVisitDiscourse={true}
        showOpenNewChat={true}
        sendBtnType="2"
        showVisitDiscourse={false}
        showOpenNewChat={false}
      /> */}
      {sessionId != 0 && <Chat
        key={sessionId}
        id={sessionId}
        session_id={sessionId}
        scene={0}
        chat_type="ai-chat"
        aiAvatar={AiAvatar} />}

    </PageContainer>
  );
};
export default ChatPage;
