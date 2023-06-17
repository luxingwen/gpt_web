import { List } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from '@umijs/max';

import { getSessionList } from '@/service/ai-chat';

interface HistorySessionProps {
  chat_type: string;
  scene_id?: string;
  onClick: (session_id: number) => void;
}


const HistorySession: React.FC<HistorySessionProps> = ({
  chat_type,
  scene_id,
  onClick,
}) => {
  // 假设这是从服务器获取的历史会话数据

  const [queryArgs, setQueryArgs] = useState<API.ReqChatSessionList>({ chat_type, scene_id, page: 1, per_page: 10 })

  const [historySessions, setHistorySessions] = useState<API.ChatSession[]>([])

  useEffect(() => {
    getSessionList(queryArgs).then(res => {
      console.log('res session:', res);
      if (res.errno === 0) {
        setHistorySessions(res.data.data);
      }
    })
  }, [queryArgs])


  const handleSessionClick = (session_id: number) => {
    if (chat_type === 'smart-chat') {
      history.push(`/smart-ai/chat/c/${session_id}`);
    }
  }

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>历史会话</h2>
      <List
        dataSource={historySessions}
        renderItem={(session) => (
          <List.Item onClick={() => handleSessionClick(session.id)} style={{ cursor: 'pointer' }}>
            {session.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default HistorySession;
