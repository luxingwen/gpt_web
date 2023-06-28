import defaultImg from '@/assets/images/icon_profile_c.png';
import { updateUser } from '@/service/user';
import { EditOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { message } from 'antd';
import { useRef, useState } from 'react';
import MyModal from './MyModal';
import './index.less';

const Index = () => {
  const myModal = useRef();
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(78, initialState);
  const { currentUser = {} } = initialState;
  const { wxName, avatar, id, email } = currentUser;
  const [nickname, setNickname] = useState(currentUser?.nickname || '');

  const handdleUpdateUsername = (name) => {
    setNickname(name);
    setInitialState({
      ...initialState,
      currentUser: {
        ...currentUser,
        nickname: name,
      },
    });
  };

  const fileInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];

    const limitSize = 1024 * 1024;
    if (file.size > limitSize) {
      message.error('图片大小不能超过1M');
      return;
    }

    const formData = new FormData();
    formData.append('avatarFile', file);
    updateUser(formData).then((res) => {
      console.log('updateUser', res);
      if (res.errno === 0) {
        message.success('修改成功');
        setInitialState({
          ...initialState,
          currentUser: {
            ...currentUser,
            avatar: res.data.avatar,
          },
        });
      }
    });
  };

  const handleClickAvatar = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="user-account-page">
      <div className="header-box">
        <img
          src={avatar || defaultImg}
          alt="avatar"
          onClick={handleClickAvatar}
        />

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleAvatarChange}
          accept="image/*"
          style={{ display: 'none' }}
        />
        <div>设置个人头像</div>
      </div>
      <div className="main-info">
        <div className="flex-c">
          <div className="name">{nickname || '-/-'}</div>
          <EditOutlined
            className="anticon-edit"
            onClick={() => myModal.current.open()}
          />
        </div>
        <div className="id-text">ID: {id}</div>
        <div className="flex-c">
          {email && <div>邮箱: {email}</div>}
          {wxName && <div>微信: {wxName}</div>}
        </div>
      </div>
      <MyModal handdleUpdateUsername={handdleUpdateUsername} ref={myModal} />
    </div>
  );
};

export default Index;
