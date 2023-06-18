import { Button, Modal,Input } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import './index.less'

const Index = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShow(false);
    }, 3000);
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
        title="修改昵称"
        onOk={handleOk}
        onCancel={close}
        footer={[
          <Button
            key={1}
            type="primary"
            loading={loading}
            onClick={handleOk}
            className='primary-btn'
          >
            确定
          </Button>
        ]}
      >
        <div className='modal-mian-content'>
          <Input
            value={userName}
            onChange={(e)=>{setUserName(e.target.value)}}
            placeholder="请输入"
          />
        </div>
      </Modal>
    </>
  )
})
export default Index;
