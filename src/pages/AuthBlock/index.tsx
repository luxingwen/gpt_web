import { useModel } from '@umijs/max';
import { Button } from 'antd';

import { history } from '@umijs/max';
import Cookies from 'js-cookie';

import './index.less'

const AuthBlockPage = () => {

    const { initialState, setInitialState } = useModel('@@initialState');
    const { currentUser } = initialState;
    const { nickname } = currentUser;

    const backBtn = () => {
        history.push('/')
    }

    const switchBtn = () => {
        Cookies.remove('token');
        window.location.href = '/login';
    }



    return (
        <div className='block-page'>
            <span className='title'>没有访问权限</span>
            <span className='text'>当前登录账号 {nickname}，没有权限访问这个页面</span>

            <Button className={`${'btn'} ${'back'}`} onClick={backBtn}>返回首页</Button>
            <Button type="text" className={`${'btn'} ${'switch'}`} onClick={switchBtn}>切换账号</Button>
        </div>
        // <div>email : {nickname}</div>
    )
}

export default AuthBlockPage