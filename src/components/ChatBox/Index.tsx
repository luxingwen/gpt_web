

import AiLogo from '@/assets/images/logo.png';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Input, message, Button, Modal } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';

import { getHistoryChatMessage, queryQuestion } from '@/service/api';
import { wssocket } from '@/utils/ws_socket';
import Messages from './components/Messages'

import './index.less';
import { toogleFullScreen } from './utils';
import { smartChatCompletions } from '@/service/smart-chat';

import { useModel } from 'umi';


const TRYING_MSG = '正在努力思考...';
const END_MSG = '###### [END] ######';



const Index = ({
  placeholderText = '',
  showFullScreen = false,
  showVisitDiscourse = false,
  showOpenNewChat = false,
  sendBtnType = '1', // [1 输入框右外侧] [2输入框右内侧]
  chat_type = 'ai-chat', // ai-chat | smart-chat
  scene_id = '', // 智能场景id
  session_id = 0, // 会话id
}) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [messages, setMessages] = useState<API.MessageType[]>([]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);

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
    let prevScrollTop = 0;

    const handleScroll = (event) => {
      const { scrollTop } = event.target;
      const isScrollingUp = scrollTop < prevScrollTop;

      if (scrollTop <= 100 && isScrollingUp) {
        requestOlderMessages();
      }

      prevScrollTop = scrollTop;
    };

    console.log('useEffect:', prevScrollTop);

    const messagesContainer = messagesContainerRef.current;
    if (messagesContainer) {
      messagesContainer.addEventListener('scroll', handleScroll);
      return () => {
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

    setNewMessageReceived(false);

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
              msg_id: 'u-' + item.id,
              time: item.add_time,
              avatar: currentUser.avatar,
            },
            {
              msg: item.answer,
              self: false,
              msg_id: 'ai' + item.id,
              is_end: true,
              time: item.create_time,
              avatar: AiLogo,
            },
          );
        });
        setMessages((prev) => [...msgList, ...prev]); // prepend the older messages to the start of the list
      })
      .catch((err) => {
        console.log('getHistory ChatMessage', err);
      });
  };



  // 处理发送消息
  const hanedleRequestQuestion = async (question) => {
    const handleMsg = (msg) => {
      setMessages([
        ...messages,
        { msg_id: 'u-' + msg.id, msg: input, self: true, is_end: true, time: +new Date(), avatar: currentUser.avatar },
        {
          msg: TRYING_MSG,
          self: false,
          msg_id: 'ai-' + msg.id,
          is_end: false,
          avatar: AiLogo,
        },
      ]);
      setIsMsgEnd(false);
    };

    if (chat_type === 'ai-chat') {
      // const quessionRes = queryQuestion(question);
      const quessionRes = await queryQuestion(question)
      // 剩余次数不足，提示购买次数
      if(quessionRes.errno == 4002){
        Modal.info({
          title: '提示',
          content: (
            <div>
              <p>剩余次数不足，请购买次数</p>
            </div>
          ),
          maskClosable: true,
          closable: true,
          cancelText: '取消',
          okText: '去购买',
          okButtonProps: {
            style: {
              backgroundColor: '#4b64f3'
            }
          },

          onCancel(){
            console.log('取消');
          },
          onOk() {
            console.log('去购买');
          },
        });
        return
      }
      if (quessionRes.errno !== 0) {
        message.error(quessionRes.errmsg)
        return
      }
      handleMsg(quessionRes.data);

    } else {
      const quessionRes = smartChatCompletions({ content: question, scene_id: scene_id, session_id: session_id });
      if (quessionRes.errno !== 0) {
        return;
      }
      handleMsg(quessionRes.data);
    }
  };


  const handleSend = () => {
    if (!isMsgEnd) {
      message.error('请等待机器人回复后再发送消息');
      return;
    }

    if (input) {
      hanedleRequestQuestion(input)
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

    if (!currentUser) {
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
              msg_id: 'u-' + item.id,
              time: item.add_time,
              avatar: currentUser.avatar,
            },
            {
              msg: item.answer,
              self: false,
              msg_id: 'ai-' + item.id,
              is_end: true,
              time: item.create_time,
              avatar: AiLogo,
            },
          );
        });
        setMessages([...messages, ...msgList]);
      })
      .catch((err) => {});

    wssocket.create(currentUser.id);

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
  }
  
  return (
    <div
      className="chat-box-component"
      style={{ height: '100vh' }}
      id="chartFullScreen"
    >
      <div className="w100 scroll-box" ref={messagesContainerRef}>
        <Messages messages={messages} isMsgEnd={isMsgEnd}/>
        <div className="ai-asnswer-tips tc">
          -- 问答结果由AI生成，仅供参考 --
        </div>
      </div>
      <div className="flex-cc send-info-box" style={{ width: '100%' }}>
        {/* 输入框左侧的按钮组 */}
        {renOperateBtns()}
        {/* 不同类型的输入框 */}
        {renderInputContent()}
      </div>


    </div>
  );
};

export default Index;
