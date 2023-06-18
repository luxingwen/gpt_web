import Exchange from '@/assets/images/exchange.svg';
import { CopyOutlined } from '@ant-design/icons';
import {
  Input,
  Button,
  Space,
  message,
  Divider,
} from 'antd';
import { useEffect, useState, useRef } from 'react';
import copy from 'copy-to-clipboard';
import ShareImgModal from './ShareImgModal'
import ShareLinkModal from './ShareLinkModal'
import './index.less'



const Index = () => {
  const shareImgModalRef = useRef()
  const shareLinkModalRef = useRef()
  const [myInvitCode, setMyInvitCode] = useState('dsfnjfndn')
  const [myInvitLink, setMyInvitLink] = useState('http://ssssss')



  // 复制我的邀请码
  const copyMyInvitCode = () => {
    copy(myInvitCode)
    message.success('复制链接成功')
  }


  // 复制分享链接
  const InputSuffix = (type) => {
    const text = ['复制分享链接', '确定'][type];
    const clickSuffix = () => {
      if (type == 0) {
        console.log(1);
        copy(myInvitLink)
        // message.success('复制链接成功')
        shareLinkModalRef.current.open()
      } else {
        console.log('----');
      }
    }
    return <div className="input-suffix-box pointer" onClick={clickSuffix}>
      {text}
    </div>
  }


  return <div className='invition-price-page'>
    <div className="invition-info">
      <div className="invition-item">
        <Space className="invition-label">
          我的邀请码：
          <span>123456</span>
          <CopyOutlined className='copy-icon' onClick={copyMyInvitCode} />
        </Space>
        <div className='flex-c input-info'>
          <Input addonAfter={InputSuffix(0)} value={myInvitLink} placeholder='请输入' />
          <Button type='primary' className='primary-btn' onClick={()=>shareImgModalRef.current.open()}>专属邀请图</Button>
        </div>
      </div>
      <div className="invition-item">
        <Space className="invition-label">
          邀请我的人：
        </Space>
        <div className='flex-c input-info'>
          <Input addonAfter={InputSuffix(1)} placeholder='输入对方邀请码' />
          <div className='primary-btn last'></div>
        </div>
      </div>
    </div>
    <Divider />
    <div className='invition-price-box'>
      <div className="invition-label my-code-text">邀请奖励</div>
      <div className="invition-label">邀请人数：31 人</div>
      <div className="invition-label">奖励免费问答次数：93 次</div>

      <div className="price-desc-info">
        <div className="price-desc-title">邀请奖励说明：</div>
        <p>1. 将你的邀请码（邀请链接）分享给他人，ta登录「问答云助手」后，进入页面“我的-邀请我的人”，填写你的邀请码提交给云助手后，你将自动获得3次免费问答次数。</p>
        <p>2. 如果你有更多社群资源，请联系客服商务合作。</p>
      </div>
    </div>
    <ShareImgModal ref={shareImgModalRef}/>
    <ShareLinkModal ref={shareLinkModalRef}/>
  </div>
}

export default Index;