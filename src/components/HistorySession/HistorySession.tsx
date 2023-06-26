import { List } from 'antd';
import React, { useState, useEffect } from 'react';
import { history } from '@umijs/max';
import { HistoryOutlined } from '@ant-design/icons';
import { getSessionList } from '@/service/ai-chat';


interface HistorySessionProps {
  chat_type: string;
  scene_id?: string;
  onClick: (session_id: number) => void;
  session_id?: number;
}


const HistorySession: React.FC<HistorySessionProps> = ({
  chat_type,
  scene_id,
  onClick,
  session_id = 0,
}) => {
  // 假设这是从服务器获取的历史会话数据

  const [queryArgs, setQueryArgs] = useState<API.ReqChatSessionList>({ chat_type, scene_id, page: 1, per_page: 10 })

  const [historySessions, setHistorySessions] = useState<API.ChatSession[]>([])

  console.log('historySessions:', session_id);

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
    <div className='ml-1'>
      <h2 className='ml-6 h-10'>
        <HistoryOutlined style={{ marginRight: '10px' }} />
        历史会话
      </h2>
      <List
        dataSource={historySessions}
        renderItem={(session) => (
          <List.Item
            className={`hover:bg-gray-200 rounded pl-7 h-10 ${session_id === session.id ? 'text-white' : ''}`}
            onClick={() => handleSessionClick(session.id)}
            style={{
              cursor: 'pointer', background: session.id === session_id ? '#4B64F3' : 'transparent'
            }} // 添加选中状态的样式
          >
            {session.name}
          </List.Item>
        )}
      />
    </div>
  );
};

export default HistorySession;
