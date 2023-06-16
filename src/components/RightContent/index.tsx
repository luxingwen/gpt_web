import {
  LoginOutlined,
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Space, Avatar } from 'antd';
import HeaderDropdown from '../HeaderDropdown';
import Cookies from 'js-cookie';
import { getUserInfo } from '@/service/user';

const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMTE5IiwiZXhwIjoxNzA0NDYyMzk1LCJpYXQiOjE2ODU3MTM1OTUsImlzcyI6InRlc3QifQ.jfVomRADsD1IaiEjV37Ovvjuukzarflqx_BFDo0kG5o';
//const defaultToken =
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyNjAwMDAiLCJleHAiOjE3MDU0MDkzNDksImlhdCI6MTY4NjY2MDU0OSwiaXNzIjoidGVzdCJ9.ACRdI-Y3Mc6UKvOIo7wO2mHVdJKi-97q-hsZEUy0EXE';


export default function RightContent() {
  const { initialState, setInitialState } = useModel('@@initialState');

  const { currentUser } = initialState;


  console.log("RightContent currentUser:", currentUser);


  const handleClickLogin = () => {
    console.log('login');
    // wxlogin();
    Cookies.set('token', defaultToken);
    getUserInfo().then((res) => {
      console.log("getUserInfo res:", res);
      if (res.error == 0) {
        setInitialState({
          ...initialState,
          currentUser: res.data,
        });
      }
    });
  };

  const handleLogout = () => {
    console.log('logout');
    // storage.removeItem('userInfo');
    Cookies.remove('token');
    setInitialState({
      ...initialState,
      currentUser: undefined,
    });
    // setUserInfo(null);
    // history.push('/');
  };


  return (
    <Space
      style={{
        marginRight: 16,
      }}
    >
      {currentUser ? <HeaderDropdown
        menu={{
          selectedKeys: [],
          onClick: (event) => {
            const { key } = event;
            console.log(key);
            if (key == 'logout') {
              handleLogout();
            }
          },
          items: [
            {
              key: 'center',
              icon: <UserOutlined />,
              label: '个人中心',
            },
            {
              key: 'settings',
              icon: <SettingOutlined />,
              label: '个人设置',
            },
            {
              type: 'divider' as const,
            },
            {
              key: 'logout',
              icon: <LogoutOutlined />,
              label: '退出登录',
            },
          ],
        }}
      >

        <span>
          <Avatar src={currentUser.avatar} ></Avatar>
          <span>{currentUser.nickname}</span>
        </span>

      </HeaderDropdown>
        :
        <div onClick={handleClickLogin}>
          <LoginOutlined />
          <span>登录</span>
        </div>

      }
    </Space>
  );
}
