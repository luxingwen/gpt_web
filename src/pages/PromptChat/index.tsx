import React, { useState, useEffect, useRef } from 'react';
import { Input, Button, Avatar, message, Modal } from 'antd';
import { UserOutlined, RobotOutlined } from '@ant-design/icons';
import HeaderComponent from '@/components/Header';
import { wssocket } from '@/utils/ws_socket';
import storage from '@/utils/storage';
import AiLogo from '@/assets/images/logo.png';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

import breaks from 'remark-breaks';
import remarkGfm from 'remark-gfm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useParams } from 'react-router-dom';

import {
  queryQuestion,
  getHistoryChatMessage,
  getPromptScenesInfo,
} from '@/service/api';

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
const ChatMessage = ({ messageText, self, userAvatar }) => {
  const chatMessageStyle = {
    display: 'flex',
    justifyContent: self ? 'flex-end' : 'flex-start',
    marginBottom: '10px',
    alignItems: 'flex-start', // 修改为 'flex-start'，使头像和内容上对齐
  };

  const messageBoxStyle = {
    borderRadius: '10px',
    padding: '10px',
    color: 'white',
    background: self ? '#007bff' : '#6c757d',
    maxWidth: '60%',
    wordBreak: 'break-word', // 修改为 'break-word'，超出容器宽度时自动换行
    whiteSpace: 'pre-wrap', // 修改为 'pre-wrap'，保留用户输入的空格和换行符并自动换行
    boxShadow: '0 0 10px rgba(0,0,0,0.1)', // 添加阴影效果
  };

  const avatarStyle = {
    marginLeft: self ? '10px' : '0', // 用户头像的 marginLeft 为 10px，AI 头像的 marginLeft 为 0
    marginRight: self ? '0' : '10px', // 用户头像的 marginRight 为 0，AI 头像的 marginRight 为 10px
  };

  const codeBlockStyle = {
    background: '#000000', // 设置代码块背景颜色为黑色
  };

  const themes = {
    dark: prism,
  };
  const renderCodeBlock = ({ language, value }) => {
    console.log('renderCodeBlock:', language, value);
    return (
      <div style={{ position: 'relative' }}>
        <SyntaxHighlighter
          showLineNumbers={false}
          style={themes.dark}
          language={language || 'text'} // use 'text' as the default language
          PreTag="div"
        >
          {value.replace(/\n$/, '')}
        </SyntaxHighlighter>
        <CopyToClipboard text={value}>
          <button
            style={{
              position: 'absolute',
              right: '5px',
              bottom: '5px',
              zIndex: 2,
              background: '#6c757d',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              borderRadius: '3px',
              cursor: 'pointer',
            }}
            onClick={() => {
              message.success('复制成功');
            }}
          >
            Copy
          </button>
        </CopyToClipboard>
      </div>
    );
  };
  return (
    <div style={chatMessageStyle}>
      {!self && <Avatar src={AiLogo} style={avatarStyle} />}
      <div style={messageBoxStyle}>
        {self ? (
          <div>
            {messageText.split('\n').map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        ) : (
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code: ({ node, inline, className, children, ...props }) => {
                const match = /language-(\w+)/.exec(className || '');
                return !inline ? (
                  renderCodeBlock({
                    language: match ? match[1] : null,
                    value: String(children).replace(/\n$/, ''),
                  })
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              img: ({ node, ...props }) => {
                // 注意这里：我们可以添加一个样式来限制图片的最大宽度。
                return <img {...props} style={{ maxWidth: '100%' }} />;
              },
            }}
          >
            {messageText}
          </ReactMarkdown>
        )}
      </div>
      {self && <Avatar src={userAvatar} style={avatarStyle} />}
    </div>
  );
};

const ChatPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [userInfo, setUserInfo] = useState({});
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

    let uinfo = storage.getItem('userInfo');
    console.log('uinfo:', uinfo);
    setUserInfo(uinfo);
    console.log('uinfo.id:', uinfo.id);
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
      <div
        style={{
          width: '100%',
          position: 'fixed',
          top: '0',
          zIndex: '1',
          backgroundColor: '#fff',
        }}
      >
        <HeaderComponent />
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'fixed',
          top: '64px',
          width: '60%',
          margin: 'auto',
          left: '20%',
          right: '20%',
          padding: '10px',
          zIndex: '1',
          backgroundColor: '#fff',
        }}
      >
        <h2>{sceneInfo.name}</h2>
        <div>
          <Button
            style={{ marginRight: '18px' }}
            onClick={handleConversationHistory}
          >
            会话记录
          </Button>
          <Button onClick={handleExample}>示例</Button>
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

      <div
        className="hideScrollbar"
        style={{
          flex: '1',
          marginTop: '128px',
          paddingTop: '10px',
          marginBottom: '160px',
          backgroundColor: 'white',
          overflowY: 'auto',
          height: 'calc(100vh - 160px)',
          position: 'relative',
          zIndex: '0',
        }}
        ref={messagesContainerRef}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div style={{ width: '60%' }}>
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
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          paddingBottom: '80px',
          position: 'fixed',
          bottom: '0',
          backgroundColor: '#fff',
          zIndex: '2',
        }}
      >
        <div style={{ width: '40%', position: 'relative' }}>
          <TextArea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onPressEnter={handleSend}
            style={{ paddingRight: '60px', borderRadius: '18px' }}
            rows={4}
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <Button
            onClick={handleSend}
            style={{ position: 'absolute', right: '10px', bottom: '10px' }}
          >
            发送
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
