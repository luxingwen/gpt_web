import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, message } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AiLogo from '@/assets/images/logo.png';

import './ChatMessage.less';

const themes = {
  dark: prism,
};

const renderCodeBlock = ({ language, value }) => {
  //  console.log('renderCodeBlock:', language, value);
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

const ChatMessage = ({ messageText, self, userAvatar, msgEnd }) => {
  const paragraphs = messageText.split('\n');

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
    <div
      className="chat-message-wrapper"
      style={{
        justifyContent: self ? 'flex-end' : 'flex-start',
      }}
    >
      {!self && (
        <Avatar
          src={AiLogo}
          style={{
            marginLeft: self ? '10px' : '0',
            marginRight: self ? '0' : '10px',
          }}
        />
      )}
      <div
        className="chat-message-box"
        style={{
          background: self ? '#007bff' : '#6c757d',
        }}
      >
        {renderMessageText()}
      </div>
      {self && (
        <Avatar
          src={userAvatar}
          style={{
            marginLeft: self ? '10px' : '0',
            marginRight: self ? '0' : '10px',
          }}
        />
      )}
    </div>
  );
};

export default ChatMessage;
