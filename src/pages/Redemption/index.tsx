import { Button, Image, Input, Typography, message } from 'antd';
import { useState } from 'react';

import QRCodeImage from '@/assets/images/group-qrcode.png';
import LogoImage from '@/assets/images/redemption-code.png';
import ContentLayout from '@/layouts/index';

import { exchangeByCode } from '@/service/api';

import './index.less';

const { Title } = Typography;

const RedemptionPage = () => {
  const [redeemCode, setRedeemCode] = useState('');

  const handleRedeemCodeChange = (e) => {
    setRedeemCode(e.target.value);
  };

  const handleRedeem = () => {
    // 处理兑换逻辑
    console.log('兑换口令：', redeemCode);

    exchangeByCode({ code: redeemCode })
      .then((res) => {
        message.info(res);
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
      });
  };

  return (
    <ContentLayout>
      <div className="redemption-page">
        <div className="logo-container">
          <Image width={200} src={LogoImage} preview={false} />
        </div>

        <div className="input-container">
          <Input
            value={redeemCode}
            onChange={handleRedeemCodeChange}
            placeholder="请输入兑换口令"
          />
          <Button type="primary" onClick={handleRedeem}>
            提交
          </Button>
        </div>

        <div className="qrcode-container">
          <Title level={3}>关注社群二维码，免费领取口令码</Title>
          <Image src={QRCodeImage} preview={false} />
        </div>
      </div>
    </ContentLayout>
  );
};

export default RedemptionPage;
