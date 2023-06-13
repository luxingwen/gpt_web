import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, message } from 'antd';
import { wssocket } from '@/utils/ws_socket';
import storage from '@/utils/storage';
import {
  queryQuestion,
  getHistoryChatMessage,
  getUserInfo,
} from '@/service/api';

import ChatMessage from '@/components/ChatBox/ChatMessage';
import { wxlogin } from '@/service/user';
import './index.less';

const { TextArea } = Input;

const TRYING_MSG = '正在努力思考...';
const END_MSG = '###### [END] ######';

const Index = ({ placeholderText }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);
  const [userInfo, setUserInfo] = useState(storage.getItem('userInfo'));
  const [isMsgEnd, setIsMsgEnd] = useState(true);
  const [loadAllMsg, setLoadAllMsg] = useState(false);
  const [historyQuery, setHistoryQuery] = useState({
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
            { msg: item.question, self: true, is_end: true },
            { msg: item.answer, self: false, msg_id: item.id, is_end: true },
          );
        });
        setMessages((prev) => [...msgList, ...prev]); // prepend the older messages to the start of the list
      })
      .catch((err) => {
        console.log('getHistory ChatMessage', err);
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
          console.log('query Question', res.data);
          setMessages([
            ...messages,
            { msg: input, self: true, is_end: true },
            {
              msg: TRYING_MSG,
              self: false,
              msg_id: res.data.id,
              is_end: false,
            },
          ]);
          setIsMsgEnd(false);
        })
        .catch((err) => {
          console.log('query Question', err);
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
    getUserInfo().then((res) => {
      if (res.errno === 401) {
        message.error('请先登录');
        wxlogin();
        return;
      }
      if (res.errno == 0) {
        storage.setItem('userInfo', res.data);
        setUserInfo(res.data);
      }
    });

    if (!userInfo) {
      message.error('请先登录');
      return;
    }

    getHistoryChatMessage(historyQuery)
      .then((res) => {
        let msgList = [];
        res.data.data.forEach((item) => {
          msgList.unshift(
            { msg: item.question, self: true, is_end: true },
            { msg: item.answer, self: false, msg_id: item.id, is_end: true },
          );
        });
        setMessages([...messages, ...msgList]);
      })
      .catch((err) => {});

    wssocket.create(userInfo.id);

    wssocket.addHandler((msg) => {
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
    if (newMessageReceived) {
      scrollToBottom();
    }
  }, [messages]);

  return (
    <div className="chat-box-component w100">
      <div className="scroll-box" ref={messagesContainerRef}>
        <div>
          {messages.map((item, index) => (
            <ChatMessage
              key={index}
              messageText={item.msg}
              self={item.self}
              userAvatar={userInfo.avatar}
              msgEnd={index === messages.length - 1 && !isMsgEnd}
            />
          ))}
        </div>
        <div className="ai-asnswer-tips tc">
          -- 问答结果由AI生成，仅供参考 --
        </div>
      </div>

      <div className="w100 flex-cc send-info-box">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onPressEnter={handleSend}
          className="send-msg-input"
          placeholder={placeholderText}
        />
        <div className="send-btn" onClick={handleSend}></div>
        {/* <Button onClick={handleSend} className="send-msg-button">
          发送
        </Button> */}
      </div>
    </div>
  );
};

export default Index;
