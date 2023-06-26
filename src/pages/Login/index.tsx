import React, { useState } from 'react'
import { Layout } from 'antd';
import './index.less';
import CheckHeader from './components/CheckHeader';
import EmailLogin from './components/EmailLogin';
import WXLogin from './components/WXLogin';
import { useModel } from '@umijs/max';
import { history } from '@umijs/max';

const { Content } = Layout;

const LoginPage = () => {

    const [selectIdx, setSelectIdx] = useState<number>(0)

    const { initialState, setInitialState } = useModel('@@initialState');
    console.log('init => ', initialState?.currentUser)
    const { currentUser } = initialState;
    // const { nickname } = currentUser;

    const changeIdxCallBack = (idx: number) => {
        setSelectIdx(idx)
    }


    return (
        <>
            <Content>
                <div>
                    {currentUser ? <div className='login-page'>
                        <div className='hit-title'>
                            <span> 您已登陆，请点击右上角菜单中“退出登录”后重试</span>
                        </div>

                    </div> :
                        <div className='login-page'>
                            <div className='title'>欢迎登录</div>
                            <div className='main-info'>
                                <CheckHeader callback={changeIdxCallBack} />
                                {selectIdx === 0 ? <EmailLogin /> : <WXLogin></WXLogin>}
                            </div>
                        </div>
                    }
                </div>
            </Content>
        </>
    )
}

export default LoginPage