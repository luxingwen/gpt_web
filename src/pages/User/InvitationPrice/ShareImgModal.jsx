import { Button, Modal,Input } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import codeImg from  '@/assets/images/group-qrcode.png' 
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
        title="专属分享图"
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
            下载保存
          </Button>
        ]}
      >
        <div className='modal-mian-content flex-ccc'>
          <img src={codeImg} alt="" />
        </div>
      </Modal>
    </>
  )
})
export default Index;
