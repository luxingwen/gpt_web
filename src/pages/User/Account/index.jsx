import {
  Avatar,
  Card,
  Image,
  Layout,
  Modal,
  Space,
  Typography,
  message,
} from 'antd';

import { EditOutlined } from '@ant-design/icons';
import { useEffect, useState, useRef } from 'react';
import defaultImg from '@/assets/images/icon_profile_c.png';
import { useModel } from '@umijs/max';
import MyModal from'./MyModal'

import './index.less'



const Index = () => {
  const myModal = useRef();
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(78, initialState);
  const { currentUser = {} } = initialState;
  const { wxName, avatar, id, email, nickname } = currentUser;


  return <div className='user-account-page'>
    <div className="header-box">
      <img src={avatar || defaultImg} alt="" />
      <div>设置个人头像</div>
    </div>
    <div className="main-info">
      <div className="flex-c">
        <div className="name">{nickname || '-/-'}</div>
        <EditOutlined className='anticon-edit' onClick={()=>myModal.current.open()}/>
      </div>
      <div className='id-text'>ID: {id}</div>
      <div className="flex-c">
        {email && <div>邮箱: {email}</div>}
        {wxName && <div>微信: {wxName}</div>}
      </div>
    </div>
    <MyModal ref={myModal}/>
  </div>
}

export default Index;