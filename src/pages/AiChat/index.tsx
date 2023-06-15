import React, { useState, useEffect, useRef } from 'react';
import HeaderComponent from '@/components/Header';
import ChatBox from '@/components/ChatBox/Index';
import './index.less';

const ChatPage = () => {
  return (
    <div className="chat-new-page flex-ccc">
      <HeaderComponent />
      <ChatBox
        showFullScreen={true}
        showVisitDiscourse={true}
        showOpenNewChat={true}
        sendBtnType="2"
      />
    </div>
  );
};

export default ChatPage;
