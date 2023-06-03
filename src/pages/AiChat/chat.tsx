import React, { useEffect, useState } from 'react';

import ChatLayout from '@/layouts/chat';

import { getHistoryChatMessage } from '@/service/api';
import { List, Input, Button, Avatar } from 'antd';

import AiBotImg from '@/assets/images/logo.png';

type HistoryQuery = {
  page?: number;
  per_page?: number;
  scene?: string;
};

const IndexPage = () => {
  const [historyMessage, setHistoryMessage] = useState([]);
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    page: 0,
    per_page: 10,
  });

  const [userAvatar, setUserAvatar] = useState(AiBotImg);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() !== '') {
      let msgs = [
        ...messages,
        { author: 'user', content: input },
        { author: 'system', content: '我是系统' },
      ];
      setMessages(msgs);
      setInput('');
    }
  };

  useEffect(() => {
    getHistoryChatMessage(historyQuery).then((res) => {
      console.log('getAiChatMessage', res.data);
      setHistoryMessage(res.data);
    });
  }, []);

  const renderMessage = (message) => {
    const isUserMessage = message.author === 'user';
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: isUserMessage ? 'flex-end' : 'flex-start',
            width: '100%',
          }}
        >
          <List.Item
            style={{
              display: 'flex',
              flexDirection: isUserMessage ? 'row-reverse' : 'row',
              width: '800px',
            }}
          >
            <Avatar
              src={isUserMessage ? userAvatar : AiBotImg}
              style={{ flexShrink: 0, alignSelf: 'start' }}
            />
            <div style={{ wordBreak: 'break-word' }}>
              <span>{message.content}</span>
            </div>
          </List.Item>
        </div>
      </div>
    );
  };

  return (
    <ChatLayout>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <List
          style={{ width: '100vw', flexGrow: 1, paddingRight: '10px' }}
          dataSource={messages}
          renderItem={renderMessage}
        />
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            width: '100vw',
            backgroundColor: 'white',
            borderTop: '1px solid #ddd',
            padding: '10px 0',
          }}
        >
          <div style={{ display: 'flex', width: '80%', padding: '0 20px' }}>
            <Input
              placeholder="请输入消息"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={sendMessage}
              style={{ marginRight: '10px', flexGrow: 1 }}
            />
            <Button type="primary" onClick={sendMessage}>
              发送
            </Button>
          </div>
        </div>
      </div>
    </ChatLayout>
  );
};

export default IndexPage;
