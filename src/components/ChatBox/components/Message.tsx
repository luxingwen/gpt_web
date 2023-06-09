import { Avatar, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useMemo, memo } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import './Message.less';
import { getFormatTime } from './../utils';
import { DownloadOutlined, SoundOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';

const themes = {
  dark: prism,
};

const renderCodeBlock = ({ language, value }) => {
  return (
    <div className="chat-message-code-block">
      <SyntaxHighlighter
        showLineNumbers={false}
        style={themes.dark}
        language={language || 'text'}
        PreTag="div"
      >
        {value.replace(/\n$/, '')}
      </SyntaxHighlighter>
    </div>
  );
};

type ChatMessageProps = {
  msg: API.MessageType;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ msg }) => {
  const time = msg?.time;
  const messageText = msg?.msg;
  const self = msg?.self;
  const avatar = msg?.avatar;
  const msgEnd = msg?.is_end;

  const paragraphs = messageText.split('\n');

  // 格式化消息时间
  const formatTime = useMemo(() => getFormatTime(time), [time]);

  /**
   * copy msg
   * @param text
   */
  const handleCopy = (text) => {
    const content = text.replace(/```/g, '\n');
    copy(content);
    message.success('复制成功');
  };

  const handleDownload = async () => {
    try {
      const url = 'https://h5.kimways.com/#/mark-down';
      const token = Cookies.get('token');
      const finalUrl = `${url}?userId=${msg.user_id}&id=${msg.msg_id}&token=${token}`;

      const response = await fetch(finalUrl);
      const blob = await response.blob();

      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = `${msg.user_id}-${msg.msg_id}.md`; // 指定文件名及扩展名
      downloadLink.click();

      // 清理 URL 对象
      URL.revokeObjectURL(downloadLink.href);

      message.success('下载成功');
    } catch (error) {
      console.error('下载失败:', error);
      message.error('下载失败');
    }
  };

  const handleTextToSound = () => {
    console.log(2, msg);
  }

  const renderMessageText = () => {
    if (self) {
      return (
        <div>
          {messageText.split('\n').map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      );
    }

    return (
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ node, children, ...props }) => (
            <p {...props}>
              {children}
              {msgEnd &&
                node.children[0].value ===
                paragraphs[paragraphs.length - 1] && (
                  <span
                    className="typing-cursor"
                    style={{ display: 'inline-block' }}
                  />
                )}
            </p>
          ),

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
            return <img {...props} style={{ maxWidth: '100%' }} />;
          },
        }}
      >
        {messageText}
      </ReactMarkdown>
    );
  };

  console.log('msgEnd: ', msgEnd);
  return (
    <div className="w100 msg-wrap">
      {/* 自己的问题 */}
      {self && (
        <div className="question-box flex">
          <div className="question-main">
            <div className="msg-time">{formatTime}</div>
            <div className="question-message">{renderMessageText()}</div>
            <div className="operate-btns right">
              <div
                className="operate-btn copy"
                onClick={() => handleCopy(messageText)}
              ></div>
            </div>
          </div>
          <Avatar src={avatar} className="msg-avatar" />
        </div>
      )}

      {/* AI的回答 */}
      {!self && (
        <div className="answer-box flex">
          <Avatar src={avatar} className="msg-avatar" />
          <div className="answer-main">
            <div className="msg-time">{formatTime}</div>
            <div className="answer-message">{renderMessageText()}</div>
            <div className="operate-btns">
              <div
                className="operate-btn copy"
                onClick={() => handleCopy(messageText)}
              ></div>
              {/* <div className="operate-btn flex-ccc" onClick={handleDownload}>
                <div className='icon-box flex-cc'><DownloadOutlined /></div>
              </div> */}
              {/* <div className="operate-btn flex-ccc" onClick={handleTextToSound}>
                <div className='icon-box flex-cc'><SoundOutlined /></div>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
