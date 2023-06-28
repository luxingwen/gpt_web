import { Button, Modal,Input } from 'antd';
import { useState, forwardRef, useImperativeHandle } from 'react';
import './index.less';
import {updateUser} from '@/service/user';

const Index = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const handleOk = () => {
    setLoading(true);
    updateUser({nickname:userName}).then(res=>{
      console.log('updateUser',res);
      setLoading(false);
      if(res.errno===0){
        message.success('修改成功');
        setShow(false);
      }
     
    })
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
