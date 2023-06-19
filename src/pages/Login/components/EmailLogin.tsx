import React, { useState } from 'react'
import { Form, Input, Button } from 'antd';


const EmailLogin = () => {

    const [isShowCode, setIsShowCode] = useState<boolean>(false)
    const [time, setTime] = useState<number>(60)

    const onFinish = (values: any) => {
        console.log('Received values:', values);
        // 在这里执行提交表单的操作
    };

    const sendEmail = async () => {
        // const fileds = await form.validateFields(['account', 'email'])
        // console.log(11, fileds)
        if (isShowCode) { // 倒计时未结束,不能重复点击
            return
        }
        setIsShowCode(true)
        const active = setInterval(() => {
            setTime((preSecond) => {
                if (preSecond <= 1) {
                    setIsShowCode(false)
                    clearInterval(active)
                    // 重置秒数
                    return 60
                }
                return preSecond - 1
            })
        }, 1000)
    }

    return (
        <>
            <div className='email-login'>
                <Form
                    name="login-form"
                    layout="vertical"
                    onFinish={onFinish}
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: '请输入邮箱地址' },
                            { type: 'email', message: '请输入正确的邮箱地址' },
                        ]}
                    >
                        <Input className='email-input' />
                    </Form.Item>

                    <Form.Item
                        label="验证码"
                        name="password"
                        rules={[
                            { type: 'string' },
                            { len: 6 }
                        ]}
                        className='captcha-margin'
                    >
                        <Input className='captcha-input' placeholder='请输入邮箱验证码'
                            maxLength={6}
                            suffix={<a onClick={() => sendEmail()}>
                                {isShowCode ? `${time}秒后重新发送` : '发送验证码'}
                            </a>} />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 6 }}>
                        <Button type="primary" htmlType="submit" className='sub-btn'>
                            立即登录
                        </Button>
                    </Form.Item>
                </Form>
            </div >
        </>
    );
};

export default EmailLogin