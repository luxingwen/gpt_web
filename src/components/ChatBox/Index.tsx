import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Input, Button, Avatar, message } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import { wssocket } from '@/utils/ws_socket';
import storage from '@/utils/storage';
import {
  queryQuestion,
  getHistoryChatMessage,
  getUserInfo,
} from '@/service/api';

import ChatMessage from '@/components/ChatBox/ChatMessage';
import { wxlogin } from '@/service/user';
import { toogleFullScreen } from './utils';
import './index.less';

const { TextArea } = Input;

const TRYING_MSG = '正在努力思考...';
const END_MSG = '###### [END] ######';

const Index = ({
  placeholderText = '',
  children,
  showFullScreen = false,
  showVisitDiscourse = false,
  showOpenNewChat = false,
  sendBtnType = '1', // [1 输入框右外侧] [2输入框右内侧]
}) => {
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

  const [isFullScreen, setIsFullScreen] = useState(false);

  const getPlaceholderText = useMemo(() => {
    if (placeholderText) return placeholderText;
    return [
      '',
      '你有什么想问我的吗？',
      '请说明你的表达内容。例如：我想试试语文竞赛',
    ][+sendBtnType];
  }, [placeholderText, sendBtnType]);

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
            {
              msg: item.question,
              self: true,
              is_end: true,
              time: item.add_time,
            },
            {
              msg: item.answer,
              self: false,
              msg_id: item.id,
              is_end: true,
              time: item.create_time,
            },
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
            { msg: input, self: true, is_end: true, time: +new Date() },
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
            {
              msg: item.question,
              self: true,
              is_end: true,
              time: item.add_time,
            },
            {
              msg: item.answer,
              self: false,
              msg_id: item.id,
              is_end: true,
              time: item.create_time,
            },
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
            time: +new Date(),
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

  /**
   * 点击全屏按钮
   */
  const handleFullScreen = () => {
    console.log(8889);
    const chartDom = document.getElementById('chartFullScreen');
    toogleFullScreen(isFullScreen, chartDom);
    setIsFullScreen(!isFullScreen);
  };

  /**
   * 点击进入社群按钮
   */
  const handleVisitDiscouse = () => {
    console.log('进去社区');
  };

  /**
   * 点击进入新会话按钮
   */
  const handleOpenNewChat = () => {
    console.log('点击进入新会话按钮');
  };

  /**
   * 输入框左侧的按钮组
   * @returns  dom
   */
  const renOperateBtns = () => {
    return (
      <div className="flex-cc">
        {showFullScreen && (
          <div
            className="flex-ccc opereta-box pointer"
            onClick={handleFullScreen}
          >
            <div className="round-icon flex-cc">
              {isFullScreen ? (
                <FullscreenExitOutlined />
              ) : (
                <FullscreenOutlined />
              )}
            </div>
            <div className="opereta-text">
              {isFullScreen ? '退出全屏' : '全屏'}
            </div>
          </div>
        )}
        {showVisitDiscourse && (
          <div
            className="flex-ccc opereta-box pointer"
            onClick={handleVisitDiscouse}
          >
            <div className="round-icon flex-cc"></div>
            <div className="opereta-text">进入社群</div>
          </div>
        )}
        {showOpenNewChat && (
          <div
            className="flex-ccc opereta-box pointer"
            onClick={handleOpenNewChat}
          >
            <div className="round-icon flex-cc"></div>
            <div className="opereta-text">新会话</div>
          </div>
        )}
      </div>
    );
  };

  const sendBtnSuffix = () => {
    return (
      <div className="send-btn-suffix-box flex-cc" onClick={handleSend}>
        没图
      </div>
    );
  };
  /**
   * 不同类型的输入框
   * @returns dom
   */
  const renderInputContent = () => {
    return (
      <>
        {sendBtnType == '1' && (
          <>
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSend}
              className="send-msg-input"
              placeholder={getPlaceholderText}
            />
            <div className="send-btn" onClick={handleSend}></div>
          </>
        )}
        {sendBtnType == '2' && (
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            suffix={sendBtnSuffix()}
            className="send-msg-input type2"
            placeholder={getPlaceholderText}
          />
        )}
      </>
    );
  };
  return (
    <div className="chat-box-component w100" id="chartFullScreen">
      <div className="scroll-box" ref={messagesContainerRef}>
        {messages.map((item, index) => (
          <ChatMessage
            key={index}
            messageText={item.msg}
            self={item.self}
            time={item.time}
            userAvatar={userInfo.avatar}
            msgEnd={index === messages.length - 1 && !isMsgEnd}
          />
        ))}
        <div className="ai-asnswer-tips tc">
          -- 问答结果由AI生成，仅供参考 --
        </div>
      </div>
      <div className="w100 flex-cc send-info-box">
        {/* 输入框左侧的按钮组 */}
        {renOperateBtns()}
        {/* 不同类型的输入框 */}
        {renderInputContent()}
      </div>
    </div>
  );
};

export default Index;
