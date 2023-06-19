import { CopyOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Button, Divider, Input, Space, message } from 'antd';
import copy from 'copy-to-clipboard';
import { useEffect, useRef, useState } from 'react';
import ShareImgModal from './ShareImgModal';
import ShareLinkModal from './ShareLinkModal';

import './index.less';

import { getInvitionStatic, invitionCode } from '@/service/api';

const Index = () => {
  const shareImgModalRef = useRef();
  const shareLinkModalRef = useRef();

  const { initialState } = useModel('@@initialState');

  const currentUser = initialState?.currentUser;

  const [myInvitLink, setMyInvitLink] = useState(
    'https://www.kimways.com/user/invitatoin/' + currentUser?.id,
  );

  const [invitationInfo, setInvitationInfo] = useState({});
  const [invitationCode, setInvitationCode] = useState('');

  // 复制我的邀请码
  const copyMyInvitCode = () => {
    copy(myInvitCode);
    message.success('复制链接成功');
  };

  // 处理邀请事件
  const handleClickInvitation = () => {
    invitionCode({ parent_id: parseInt(invitationCode) }).then((res) => {
      message.info(res);
    });
  };

  useEffect(() => {
    getInvitionStatic().then((res) => {
      console.log('getInvitionStatic:', res);
      if (res.errno === 0) {
        setInvitationInfo(res.data);
      }
    });
  }, []);

  const handleCodeChange = (e) => {
    setInvitationCode(e.target.value);
  };

  // 复制分享链接
  const InputSuffix = (type) => {
    const text = ['复制分享链接', '确定'][type];
    const clickSuffix = () => {
      if (type == 0) {
        console.log(1);
        copy(myInvitLink);
        // message.success('复制链接成功')
        shareLinkModalRef.current.open();
      } else {
        console.log('----');
      }
    };
    return (
      <div className="input-suffix-box pointer" onClick={clickSuffix}>
        {text}
      </div>
    );
  };

  return (
    <div className="invition-price-page">
      <div className="invition-info">
        <div className="invition-item">
          <Space className="invition-label">
            我的邀请码：
            <span>{currentUser?.id}</span>
            <CopyOutlined className="copy-icon" onClick={copyMyInvitCode} />
          </Space>
          <div className="flex-c input-info">
            <Input
              addonAfter={InputSuffix(0)}
              value={myInvitLink}
              placeholder="请输入"
            />
            <Button
              type="primary"
              className="primary-btn"
              onClick={() => shareImgModalRef.current.open()}
            >
              专属邀请图
            </Button>
          </div>
        </div>
        <div className="invition-item">
          <Space className="invition-label">邀请我的人：</Space>
          <div className="flex-c input-info">
            <Input
              value={invitationCode}
              onChange={handleCodeChange}
              addonAfter={InputSuffix(1)}
              placeholder="输入对方邀请码"
            />
            <div
              className="primary-btn last"
              onClick={handleClickInvitation}
            ></div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="invition-price-box">
        <div className="invition-label my-code-text">邀请奖励</div>
        <div className="invition-label">
          邀请人数：{invitationInfo?.invite_user_num} 人
        </div>
        <div className="invition-label">
          奖励免费问答次数：{invitationInfo?.chat_times} 次
        </div>

        <div className="price-desc-info">
          <div className="price-desc-title">邀请奖励说明：</div>
          <p>
            1.
            将你的邀请码（邀请链接）分享给他人，ta登录「问答云助手」后，进入页面“我的-邀请我的人”，填写你的邀请码提交给云助手后，你将自动获得3次免费问答次数。
          </p>
          <p>2. 如果你有更多社群资源，请联系客服商务合作。</p>
        </div>
      </div>
      <ShareImgModal ref={shareImgModalRef} />
      <ShareLinkModal ref={shareLinkModalRef} />
    </div>
  );
};

export default Index;
