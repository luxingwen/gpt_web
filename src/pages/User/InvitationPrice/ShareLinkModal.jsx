import { Button, Modal, Input } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';

import './index.less'

const Index = forwardRef((props, ref) => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const handleOk = () => {
    close()
  };

  const open = () => {
    console.log('open', userName);
    setShow(true);
  };
  const close = () => {
    console.log('close');
    setShow(false);
  };


  useImperativeHandle(ref, () => ({
    open,
    close,
  }))

  return (
    <>
      <Modal
        open={show}
        title=""
        onOk={handleOk}
        onCancel={close}
        footer={[
          <Button
            key={1}
            type="primary"
            onClick={handleOk}
            className='primary-btn'
          >
            确定
          </Button>
        ]}
      >
        <div className='modal-mian-content flex-ccc'>
          <CheckCircleFilled className='check-circle'/>
          分享链接复制成功
        </div>
      </Modal>
    </>
  )
})
export default Index;
