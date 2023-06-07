import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, message } from 'antd';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import AiLogo from '@/assets/images/logo.png';
import styled from 'styled-components';

const ChatMessageWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.self ? 'flex-end' : 'flex-start')};
  margin-bottom: 10px;
  align-items: flex-start;
`;

const MessageBox = styled.div`
  border-radius: 10px;
  padding: 10px;
  color: white;
  background: ${(props) => (props.self ? '#007bff' : '#6c757d')};
  max-width: 60%;
  word-break: break-word;
  white-space: pre-wrap;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 767px) {
    max-width: 80%;
  }
`;

const AvatarStyle = styled(Avatar)`
  margin-left: ${(props) => (props.self ? '10px' : '0')};
  margin-right: ${(props) => (props.self ? '0' : '10px')};
`;

const CodeBlock = styled.div`
  background: #000000;
`;

const CopyButton = styled.button`
  position: absolute;
  right: 5px;
  bottom: 5px;
  z-index: 2;
  background: #6c757d;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
`;

const themes = {
  dark: prism,
};

const renderCodeBlock = ({ language, value }) => {
  console.log('renderCodeBlock:', language, value);
  return (
    <CodeBlock>
      <SyntaxHighlighter
        showLineNumbers={false}
        style={themes.dark}
        language={language || 'text'}
        PreTag="div"
      >
        {value.replace(/\n$/, '')}
      </SyntaxHighlighter>
      <CopyToClipboard text={value}>
        <CopyButton
          onClick={() => {
            message.success('复制成功');
          }}
        >
          Copy
        </CopyButton>
      </CopyToClipboard>
    </CodeBlock>
  );
};

const ChatMessage = ({ messageText, self, userAvatar }) => {
  return (
    <ChatMessageWrapper self={self}>
      {!self && <AvatarStyle src={AiLogo} self={self} />}
      <MessageBox self={self}>
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
                return <img {...props} style={{ maxWidth: '100%' }} />;
              },
            }}
          >
            {messageText}
          </ReactMarkdown>
        )}
      </MessageBox>
      {self && <AvatarStyle src={userAvatar} self={self} />}
    </ChatMessageWrapper>
  );
};

export default ChatMessage;
