import { List } from 'antd';
import React, { useState, useEffect } from 'react';

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

  useEffect(() => {
    getSessionList(queryArgs).then(res => {
      console.log(res);
    })
  }, [queryArgs])

  const historySessions = [
    { name: 'Session 1' },
    { name: 'Session 2' },
    { name: 'Session 3' },
  ];

  return (
    <div style={{ marginLeft: '20px' }}>
      <h2>历史会话</h2>
      <List
        dataSource={historySessions}
        renderItem={(session) => (
          <List.Item onClick={() => onClick(0)} style={{ cursor: 'pointer' }}>
            {session.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default HistorySession;
