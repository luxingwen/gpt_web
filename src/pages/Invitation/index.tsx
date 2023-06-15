import React, { useEffect, useState } from 'react';
import { Input, Button, Typography, Image, message } from 'antd';

import ContentLayout from '@/layouts/index';
import AppLogo from '@/assets/images/app_logo.svg';
import { invitionCode, getInvitionStatic } from '@/service/api';

import './index.less';

const { Title, Text } = Typography;

const InvitationPage = () => {
  const [invitationCode, setInvitationCode] = useState('');
  const [inviteCount, setInviteCount] = useState(10);
  const [rewardDescription, setRewardDescription] = useState('');
  const [invitationInfo, setInvitationInfo] = useState({} as any);

  const handleCodeChange = (e) => {
    setInvitationCode(e.target.value);
  };

  const handleSubmit = () => {
    invitionCode({ parent_id: parseInt(invitationCode) })
      .then((res) => {
        message.info(res);
      })
      .catch((err) => {
        message.error('提交失败');
      });
  };

  useEffect(() => {
    getInvitionStatic()
      .then((res) => {
        if (res.errno === 0) {
          setInvitationInfo(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ContentLayout>
      <div className="invitation-page">
        <div className="app-info">
          <Image width={200} src={AppLogo} preview={false} />
          <Title level={3}>邀请用户</Title>
          <Title level={3}>赢免费次数</Title>
        </div>

        <div className="invitation-section">
          <Text strong>我的邀请码：</Text>
          <Text code>{invitationInfo.user_id}</Text>
        </div>

        <div className="invitation-section">
          <div className="input-container">
            <Text strong style={{ whiteSpace: 'nowrap' }}>
              输入邀请码：
            </Text>
            <Input
              value={invitationCode}
              onChange={handleCodeChange}
              placeholder="请输入邀请码"
            />
          </div>

          <Button
            type="primary"
            className="submit-button"
            onClick={handleSubmit}
          >
            提交
          </Button>
        </div>

        <div className="invitation-reward-section">
          <Title level={3}>邀请奖励</Title>
          <Text strong>邀请人数：</Text>
          <Text>{invitationInfo.invite_user_num}</Text>
          <br />
          <Text strong>奖励免费问答次数：</Text>
          <Text>{invitationInfo.chat_times}</Text>
          <br />
          <Text strong>邀请奖励说明：</Text>
          <br />

          <Text>
            1.将你的邀请码（邀请链接）分享给他人，ta登录「AI百宝助手」后，进入页面“我的-邀请我的人”，填写你的邀请码提交给云助手后，你将自动获得3次免费问答次数。
          </Text>
          <br />

          <Text>2.如果你有更多社群资源，请联系客服商务合作。</Text>
        </div>
      </div>
    </ContentLayout>
  );
};

export default InvitationPage;
