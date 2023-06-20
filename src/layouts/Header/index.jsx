import { useState, useEffect } from 'react';
import { useModel, history } from 'umi';

import { enquireScreen } from 'enquire-js';

import Logo from '@/assets/images/logo.png'
// import Logo from '@/assets/images/group-qrcode.png'
import RightContent from '@/components/RightContent'

import './index.less'
import { message } from 'antd';

const Index = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [phoneOpen, setPhoneOpen] = useState(false);

  const { initialState = {}, setInitialState } = useModel('@@initialState');
  const { currentUser = {} } = initialState;
  const { id } = currentUser;

  /**
   * 监听window窗口改变
   */
  useEffect(() => {
    enquireScreen((mobile) => {
      setIsMobile(!!mobile)
      if (!mobile) {
        setPhoneOpen(false)
      }
    });
  }, [])

  const navList = [
    { name: 'AI百宝助手', path: '/ai' },
    { name: 'AI画涂', path: '/ai-paint/' },
    { name: '个性化数字人', path: '' },
    { name: 'AIGC解决方案', path: '' },
    { name: '价格', path: '/price' },
  ]

  const handleClickNavItem = item => {
    if (item.path) {
      history.push(item.path)
    } else {
      message.info('该功能正在开发中，敬请期待。')
    }
  }
  const NavList = () => {
    return (
      <>
        {navList.map(item => (
          <div className='nav-item flex-cc' key={item.name} onClick={() => handleClickNavItem(item)}>{item.name}</div>
        ))}
      </>
    )
  }
  return (
    <>
      <div className={`header-layout w100 flex-cb ${isMobile ? 'mobile' : ''}`}>
        <img className='logo-img pointer' src={Logo} alt="logo" width={64} height={64} loading='lazy' onClick={() => { handleClickNavItem({ path: '/' }) }} />
        {isMobile ? (
          <div className={`pointer ${phoneOpen ? 'open' : ''}`} onClick={() => { setPhoneOpen(!phoneOpen) }} >
            <em /> <em /> <em />
          </div>
        ) : (
          <div className="pc-nav-list h100 flex">
            {NavList()}
            <div className={`${id ? 'logined' : 'nav-item'} home-login flex-cc`} key='login'>
              <RightContent isHome={true} />
            </div>
          </div>
        )}
      </div >
      {<div className={`mobile-nav-list ${phoneOpen ? 'show-nav' : ''}`}>
        {NavList()}
      </div>}
    </>
  )
}

export default Index;