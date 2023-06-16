import HeaderComponent from '@/components/Header';
import storage from '@/utils/storage';
import { wssocket } from '@/utils/ws_socket';
import { Button, Input, Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';

import { getUserInfo } from '@/service/api';

import ChatMessage from '@/components/ChatMessage';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';
import './index.less';

import {
  getHistoryChatMessage,
  getPromptScenesInfo,
  queryQuestion,
} from '@/service/api';
import { wxlogin } from '@/service/user';

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
  const [userInfo, setUserInfo] = useState(storage.getItem('userInfo'));
  const [isMsgEnd, setIsMsgEnd] = useState(true);
  const [loadAllMsg, setLoadAllMsg] = useState(false);
  const { scene } = useParams();
  const [historyQuery, setHistoryQuery] = useState<HistoryQuery>({
    page: 0,
    per_page: 10,
    scene: scene,
  });
  const [newMessageReceived, setNewMessageReceived] = useState(true);
  const [isExampleModalVisible, setIsExampleModalVisible] = useState(false);

  const [sceneInfo, setSceneInfo] = useState({});

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
      queryQuestion(input, parseInt(scene))
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

    getPromptScenesInfo({ scene: scene })
      .then((res) => {
        console.log('getPromptScenesInfo', res.data);
        setSceneInfo(res.data);
      })
      .catch((err) => {
        console.log('getPromptScenesInfo', err);
      });

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

    wssocket.create(userInfo.id);

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

  const handleConversationHistory = () => {};

  const handleExample = () => {
    setIsExampleModalVisible(true);
  };

  const handleExampleOk = () => {
    setIsExampleModalVisible(false);
  };

  const handleExampleCopy = () => {
    console.log('复制成功');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
      }}
    >
      {/* <div
        style={{
          width: '100%',
          position: 'fixed',
          top: '0',
          zIndex: '1',
          backgroundColor: '#fff',
        }}
      > */}
      <HeaderComponent />
      {/* </div> */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div className="chat-example-header">
          <div className="left-content">
            <h2>{sceneInfo.name}</h2>
          </div>
          <div className="right-content">
            {/* <Button style={{ marginRight: '18px' }} onClick={handleConversationHistory}>
      会话记录
    </Button> */}
            <Button onClick={handleExample}>示例</Button>
          </div>
        </div>
      </div>

      <Modal title="示例如下" visible={isExampleModalVisible} footer={null}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <h2>可以这样子提问</h2>
          <CopyToClipboard text={sceneInfo.question} onCopy={handleExampleCopy}>
            <Button>复制</Button>
          </CopyToClipboard>
        </div>
        <div>
          <p>{sceneInfo.question}</p>
        </div>
        <Button
          type="primary"
          onClick={handleExampleOk}
          style={{ marginTop: '24px' }}
        >
          我明白了
        </Button>
      </Modal>

      <div className="hide-scrollbar" ref={messagesContainerRef}>
        <div
          style={{
            display: 'flex',
            flex: '1',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div className="chat-container">
            {messages.map((item, index) => (
              <ChatMessage
                key={index}
                messageText={item.msg}
                self={item.self}
                userAvatar={userInfo.avatar}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        className="send-content-div"
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          position: 'fixed',
          bottom: '0',
          backgroundcolor: '#fff',
          zIndex: '2',
        }}
      >
        <div className="send-div">
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            style={{ paddingRight: '60px', borderRadius: '18px' }}
            rows={4}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <Button onClick={handleSend} className="send-button">
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
