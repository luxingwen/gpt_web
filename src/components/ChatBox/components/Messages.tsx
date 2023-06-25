import { memo } from 'react';
import Message from './Message';
import { Input, message, Spin, Modal } from 'antd';


const renderMessages = ({ messages, isMsgEnd, loading }) => {
  return (
    <>
      {loading && <Spin className='chat-top-loading' />}
      {messages.map((item, index) => (
        <Message
          key={item.id || `message-${index}`}
          msg={{ ...item, is_end: (index === (messages.length - 1)) && !isMsgEnd }}
        />
      ))}
    </>
  )
}

export default memo(renderMessages)