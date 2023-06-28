import { updateUser } from '@/service/user';
import { Button, Input, Modal, message } from 'antd';
import { forwardRef, useImperativeHandle, useState } from 'react';
import './index.less';

const Index = forwardRef((props, ref) => {
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);

  const handleOk = () => {
    if (userName === '') {
      message.error('请输入昵称');
      return;
    }

    if (userName.length < 3) {
      message.error('昵称长度不能小于3');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('nickname', userName);
    updateUser(formData).then((res) => {
      console.log('updateUser', res);
      setLoading(false);
      if (res.errno === 0) {
        message.success('修改成功');
        props?.handdleUpdateUsername(userName);
        setShow(false);
      }
    });
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
  }));

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
            className="primary-btn"
          >
            确定
          </Button>,
        ]}
      >
        <div className="modal-mian-content">
          <Input
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            placeholder="请输入"
          />
        </div>
      </Modal>
    </>
  );
});
export default Index;
