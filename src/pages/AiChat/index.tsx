import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, message } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import HeaderComponent from '@/components/Header';
import { wssocket } from '@/utils/ws_socket';
import storage from '@/utils/storage';
import { queryQuestion, getHistoryChatMessage } from '@/service/api';
import styled from 'styled-components';
import { wxlogin } from '@/service/user';
import ChatMessage from '@/components/ChatMessage';

const { TextArea } = Input;

type Message = {
  msg_id: number;
  msg: string;
  role: string;
};

type HistoryQuery = {
  page?: number;
  per_page?: number;
  scene?: string;
};

const TRYING_MSG = '正在努力思考...';
const END_MSG = '###### [END] ######';

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});
  const [isMsgEnd, setIsMsgEnd] = useState(true);
  const [loadAllMsg, setLoadAllMsg] = useState(false);
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    page: 0,
    per_page: 10,
  });
  const [newMessageReceived, setNewMessageReceived] = useState(true);

  useEffect(() => {
    const handleScroll = (event) => {
      // Check if we're at the top of the container
      const { scrollTop } = event.target;
      if (scrollTop === 0) {
        // Request older messages

        requestOlderMessages();
      }
    };
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
      return () => {
        // Clean up the event listener when the component unmounts
        messagesContainer.removeEventListener('scroll', handleScroll);
      };
    }
  }, [messagesContainerRef, requestOlderMessages]);

  const requestOlderMessages = () => {
    if (loadAllMsg) {
      message.success('没有更多消息了');
      return;
    }

    historyQuery.page = historyQuery.page + 1;

    // if (historyQuery.page > 1) {
    setNewMessageReceived(false);
    // }
    // update the page number
    setHistoryQuery(historyQuery);

    getHistoryChatMessage(historyQuery)
      .then((res) => {
        if (res.data.data.length === 0) {
          setLoadAllMsg(true);
          message.success('没有更多消息了');
          return;
        }

        let msgList = [];
        res.data.data.forEach((item) => {
          msgList.push(
            { msg: item.question, self: true },
            { msg: item.answer, self: false, msg_id: item.id },
          );
        });
        setMessages((prev) => [...msgList, ...prev]); // prepend the older messages to the start of the list
      })
      .catch((err) => {
        console.log('getHistoryChatMessage', err);
      });
  };

  const handleSend = () => {
    if (!isMsgEnd) {
      message.error('请等待机器人回复后再发送消息');
      return;
    }

    if (input) {
      queryQuestion(input)
        .then((res) => {
          console.log('queryQuestion', res.data);
          setMessages([
            ...messages,
            { msg: input, self: true },
            { msg: TRYING_MSG, self: false, msg_id: res.data.id },
          ]);
          setIsMsgEnd(false);
        })
        .catch((err) => {
          console.log('queryQuestion', err);
        });

      setInput('');
    }
  };

  const scrollToBottom = () => {
    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  };

  useEffect(() => {
    let uinfo = storage.getItem('userInfo');
    console.log('uinfo:', uinfo);
    if (!uinfo) {
      message.error('请先登录');
      wxlogin();
      return;
    }
    setUserInfo(uinfo);
    console.log('uinfo.id:', uinfo.id);

    getHistoryChatMessage(historyQuery)
      .then((res) => {
        console.log('getHistoryChatMessage', res.data);
        let msgList = [];
        res.data.data.forEach((item) => {
          msgList.unshift(
            { msg: item.question, self: true },
            { msg: item.answer, self: false, msg_id: item.id },
          );
        });
        setMessages([...messages, ...msgList]);
      })
      .catch((err) => {
        console.log('getHistoryChatMessage', err);
      });

    wssocket.create(uinfo.id);

    wssocket.addHandler((msg) => {
      console.log('msg------->:', msg);
      handleReceive(msg.response.data);
    });
  }, []);

  const handleReceive = (itemMsg) => {
    setNewMessageReceived(true);
    if (itemMsg.msg.includes(END_MSG)) {
      setIsMsgEnd(true);
      return;
    }

    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((item) => {
        if (item.msg_id === itemMsg.msg_id) {
          if (item.msg === TRYING_MSG) {
            item.msg = '';
          }
          return {
            ...item,
            msg: item.msg + itemMsg.msg,
          };
        }
        return item;
      });
      return updatedMessages;
    });
  };

  useEffect(() => {
    console.log('newMessageReceived', newMessageReceived);
    if (newMessageReceived) {
      scrollToBottom();
    }
  }, [messages]);

  const ChatContainer = styled.div`
    width: 90%;
    @media (min-width: 600px) {
      width: 60%;
    }
  `;

  const SendStyContentDiv = styled.div`
    width: '100%';
    display: 'flex';
    justify-content: 'center';
    padding-bottom: '80px';
    position: 'fixed';
    bottom: '0';
    backgroundcolor: '#fff';
    z-index: '2';
    @media (min-width: 600px) {
      padding-bottom: '2px';
    }
  `;

  const SendStyledDiv = styled.div`
    width: 100%;
    position: relative;

    @media (min-width: 600px) {
      width: 40%;
    }
  `;

  const SendStyledTextArea = styled(TextArea)`
    padding-right: 60px;
    border-radius: 18px;

    &.ant-input {
      @media (min-width: 600px) {
        min-height: 2em;
        max-height: 6em;
      }
    }
  `;

  const SendStyledButton = styled(Button)`
    position: absolute;
    right: 10px;
    bottom: 10px;
  `;

  const HideScrollbar = styled.div`
    flex: 1;
    padding-top: 0px;
    margin-bottom: 160px;
    background-color: white;
    overflow-y: auto;
    height: calc(100vh - 160px);
    position: relative;
    z-index: 0;

    @media (max-width: 768px) {
      margin-top: 64px;
      height: calc(100vh - 80px);
      margin-bottom: 10px;
    }
  `;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* <div
        style={{
          width: '100%',
          position: 'fixed',
          top: '0',
          zIndex: '100',
          backgroundColor: '#fff',
        }}
      > */}
      <HeaderComponent />
      {/* </div> */}

      <HideScrollbar className="hideScrollbar" ref={messagesContainerRef}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <ChatContainer>
            {messages.map((item, index) => (
              <ChatMessage
                key={index}
                messageText={item.msg}
                self={item.self}
                userAvatar={userInfo.avatar}
              />
            ))}
          </ChatContainer>
        </div>
      </HideScrollbar>

      <SendStyContentDiv>
        <SendStyledDiv>
          <SendStyledTextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            style={{ paddingRight: '60px', borderRadius: '18px' }}
            rows={4}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <SendStyledButton
            onClick={handleSend}
            style={{ position: 'absolute', right: '10px', bottom: '10px' }}
          >
            发送
          </SendStyledButton>
        </SendStyledDiv>
      </SendStyContentDiv>
    </div>
  );
};

export default ChatPage;
