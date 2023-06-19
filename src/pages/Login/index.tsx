import React, { useState } from 'react'
import { Layout } from 'antd';
import './index.less';
import CheckHeader from './components/CheckHeader';
import EmailLogin from './components/EmailLogin';


const { Content } = Layout;

const LoginPage = () => {

    const [selectIdx, setSelectIdx] = useState<number>(0)

    const changeIdxCallBack = (idx: number) => {
        setSelectIdx(idx)
    }


    return (
        <>
            <Content>
                <div className='login-page'>
                    <div className='title'>欢迎登录</div>
                    <div className='main-info'>
                        <CheckHeader callback={changeIdxCallBack} />
                        {selectIdx == 0 ? <EmailLogin /> : <div>2</div>}
                    </div>
                </div>
            </Content>
        </>
    )
}

export default LoginPage