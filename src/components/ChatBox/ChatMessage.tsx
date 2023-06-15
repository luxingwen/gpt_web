import React, { useEffect, useStat, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, message } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AiLogo from '@/assets/images/logo.png';
import { getFormatTime } from './utils';
import copy from 'copy-to-clipboard';
import './ChatMessage.less';

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
      <CopyToClipboard text={value}>
        <div
          className="chat-message-code-copy-button"
          onClick={() => {
            message.success('复制成功');
          }}
        >
          Copy
        </div>
      </CopyToClipboard>
    </div>
  );
};

const ChatMessage = ({ time, messageText, self, userAvatar, msgEnd }) => {
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
          <Avatar src={AiLogo} className="msg-avatar" />
        </div>
      )}

      {/* AI的回答 */}
      {!self && (
        <div className="answer-box flex">
          <Avatar src={AiLogo} className="msg-avatar" />
          <div className="answer-main">
            <div className="msg-time">{formatTime}</div>
            <div className="answer-message">{renderMessageText()}</div>
            <div className="operate-btns">
              <div
                className="operate-btn copy"
                onClick={() => handleCopy(messageText)}
              ></div>
              <div className="operate-btn sound"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
