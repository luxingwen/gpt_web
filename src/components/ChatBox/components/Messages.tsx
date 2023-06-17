import { memo } from 'react';
import Message from './Message'


const renderMessages = ({messages, isMsgEnd})=>{
  return (
    <>
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