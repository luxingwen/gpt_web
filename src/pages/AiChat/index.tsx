import React, { useState, useEffect, useRef } from 'react';
import HeaderComponent from '@/components/Header';
import ChatBox from '@/components/ChatBox/Index';
import './index.less';

const ChatPage = () => {
  return (
    <div className="chat-new-page flex-ccc">
      <HeaderComponent />
      <ChatBox placeholderText="你有什么想问我的吗？" />
    </div>
  );
};

export default ChatPage;
