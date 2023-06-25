

import AiLogo from '@/assets/images/logo.png';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';
import { Input, message, Spin, Modal } from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import { useRequest } from 'umi';
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
  chat_type = 'ai-chat', // ai-chat | smart-chat | prompt-chat
  scene_uuids = [''], // 智能场景id
  session_id = 0, // 会话id
  aiAvatar = AiLogo, // ai头像
  scene = 0, // 场景id  prompt-chat 时使用
}) => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const currentUser = initialState?.currentUser;
  const [messages, setMessages] = useState<API.MessageType[]>([]);
  const [input, setInput] = useState('');
  const messagesContainerRef = useRef(null);
  const [isMsgEnd, setIsMsgEnd] = useState(true);


  let lastLoadAllMessageTime = 0;
  let loadAllMsg = false;

  const [historyQuery, setHistoryQuery] = useState({
    page: 0,
    per_page: 10,
    session_id: session_id,
    scene: scene,
  });

  const [isFullScreen, setIsFullScreen] = useState(false);

  const getPlaceholderText = useMemo(() => {
    if (placeholderText) return placeholderText;
    return [
      '',
      '你有什么想问我的吗？',
      '请说明你的表达内容。例如：我想试试语文竞赛',
    ][+sendBtnType];
  }, [placeholderText, sendBtnType]);



  /**
   * 滚动到聊天记录底部
   */
  const scrollToBottom = () => {
    setTimeout(() => {
      document.querySelector('#chartFullScreen .scroll-box .ai-asnswer-tips')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 300)
  }


  /**
   * 滚动到头部加载历史记录
   * @returns 
   */
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
    console.log('requestOlderMessages, loadAllMsg:', loadAllMsg);
    if (loadAllMsg) {
      const currentTime = Date.now(); // 获取当前时间
      if (currentTime - lastLoadAllMessageTime > 2000) { // 检查时间差是否大于 5 秒
        console.log('loadAllMsg', loadAllMsg);
        console.log('lastLoadAllMessageTime:', lastLoadAllMessageTime);
        console.log('currentTime:', currentTime);
        message.success('没有更多消息了');
        lastLoadAllMessageTime = currentTime; // 更新上次显示消息的时间
      }
      return;
    }

    historyQuery.page = historyQuery.page + 1;

    setHistoryQuery(historyQuery);
    getChatHistoryList.run()
  };



  const showBuyModal = () => {
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

      onCancel() {
        console.log('取消');
      },
      onOk() {
        console.log('去购买');
      },
    });
    return;
  };

  // 处理发送消息
  const hanedleRequestQuestion = async (question) => {
    const handleMsg = (msg) => {
      setMessages([
        ...messages,
        { user_id: currentUser?.id, msg_id: msg.id, id: 'u-' + msg.id, msg: input, self: true, is_end: true, time: +new Date(), avatar: currentUser.avatar },
        {
          msg: TRYING_MSG,
          self: false,
          id: 'ai-' + msg.id,
          msg_id: msg.id,
          is_end: false,
          avatar: aiAvatar,
          user_id: currentUser?.id,
        },
      ]);
      setIsMsgEnd(false);
    };

    if (chat_type === 'ai-chat') {
      // const quessionRes = queryQuestion(question);
      const quessionRes = await queryQuestion(question)
      // 剩余次数不足，提示购买次数
      if (quessionRes.errno == 4002) {
        showBuyModal();
        return;
      }
      if (quessionRes.errno !== 0) {
        message.error(quessionRes.errmsg)
        return
      }
      handleMsg(quessionRes.data);
    }
    if (chat_type === 'prompt-chat') {
      const quessionRes = await queryQuestion(question, parseInt(scene))
      if (quessionRes.errno == 4002) {
        showBuyModal();
        return;
      }
      if (quessionRes.errno !== 0) {
        message.error(quessionRes.errmsg)
        return
      }
      handleMsg(quessionRes.data);
    }

    if (chat_type === 'smart-chat') {
      const quessionRes = await smartChatCompletions({ content: question, uuids: scene_uuids, session_id: session_id });
      if (quessionRes.errno !== 0) {
        return;
      }
      handleMsg(quessionRes.data);
    }
    scrollToBottom()
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


  // 滚动到top后，加载历史记录
  const getChatHistoryList = useRequest(() => getHistoryChatMessage(historyQuery), {
    manual: true,
    onSuccess: (res) => {
      if (res.data.length === 0) {
        loadAllMsg = true;
        return;
      }
      let msgList = [];
      res.data.forEach((item) => {
        msgList.push(
          {
            msg: item.question,
            self: true,
            is_end: true,
            id: 'u-' + item.id,
            msg_id: item.id,
            time: item.add_time,
            avatar: currentUser.avatar,
            user_id: item.user_id,
          },
          {
            msg: item.answer,
            self: false,
            id: 'ai-' + item.id,
            msg_id: item.id,
            is_end: true,
            time: item.create_time,
            avatar: aiAvatar,
            user_id: item.user_id,
          },
        );
      });
      setMessages((prev) => [...msgList, ...prev]); // prepend the older messages to the start of the list
    },
  })

  // 初始化获取首屏记录
  const getChatInitList = useRequest(() => getHistoryChatMessage(historyQuery), {
    manual: true,
    onSuccess: (res) => {
      let msgList = [];
      res.data.forEach((item) => {
        msgList.unshift(
          {
            msg: item.question,
            self: true,
            is_end: true,
            id: 'u-' + item.id,
            msg_id: item.id,
            time: item.add_time,
            avatar: currentUser.avatar,
            user_id: item.user_id,
          },
          {
            msg: item.answer,
            self: false,
            id: 'ai-' + item.id,
            msg_id: item.id,
            is_end: true,
            time: item.create_time,
            avatar: aiAvatar,
            user_id: item.user_id,
          },
        );
      });
      setMessages([...messages, ...msgList]);
      scrollToBottom()
    },
  });

  const handleReceive = (itemMsg) => {
    if (itemMsg.msg.includes(END_MSG)) {
      setIsMsgEnd(true);
      return;
    }
    console.log("itemMsg:", itemMsg)

    const msgId = 'ai-' + itemMsg.msg_id;
    // console.log("msgId:",msgId)
    setMessages((prevMessages) => {
      const updatedMessages = prevMessages.map((item) => {
        // console.log("item---->:",item);
        if (item.msg_id === itemMsg.msg_id && item.id === msgId) {
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

  /**
   * 点击全屏按钮
   */
  const handleFullScreen = () => {
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
   * 页面初始化
   * 加载首屏记录
   */
  useEffect(() => {
    if (!currentUser) return;
    getChatInitList.run();
    wssocket.create(currentUser.id);
    wssocket.addHandler((msg) => {
      handleReceive(msg.response.data);
    });
  }, []);

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
        发送
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
        {getChatInitList.loading ?
          <Spin className='chat-loading' ></Spin> :
          <Messages messages={messages} isMsgEnd={isMsgEnd} loading={getChatHistoryList.loading}></Messages>
        }

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
