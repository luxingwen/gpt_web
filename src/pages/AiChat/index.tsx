import React, { useState, useEffect, useRef } from 'react';
import ChatBox from '@/components/ChatBox/Index';
import { PageContainer } from '@ant-design/pro-layout';
import './index.less';

const ChatPage = () => {
  return (
   <PageContainer
    title={false}
   >

      <ChatBox
        showFullScreen={true}
        showVisitDiscourse={true}
        showOpenNewChat={true}
        sendBtnType="2"
      />
    </PageContainer>
  );
};

export default ChatPage;
