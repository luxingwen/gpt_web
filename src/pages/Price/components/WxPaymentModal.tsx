import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, message, Spin } from 'antd';
import QRCode from 'qrcode.react';
import { orderSubmit, prePay } from '@/service/api';
import { wxlogin } from '@/service/user';


interface WxPaymentModalProps {
    productId: string
    PayCallback?: Function
    CancelCallback?: Function
}
const WxPaymentModal: React.FC<WxPaymentModalProps> = ({ productId, PayCallback, CancelCallback }) => {

    const [paymentData, setPaymentData] = useState<string>('');

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);


    const ChatPrePay = (orderId: Number) => {
        console.log('ChatPrePay', orderId);
        prePay({ order_id: orderId, client: 'web' })
            .then((res) => {
                console.log('prePay', res);
                if (res.errno === 0) {
                    setPaymentData(res.data.code_url);
                    setIsVisible(true);
                } else {
                    message.error('充值出现异常，请稍后再试');
                }
            })
    };

    useEffect(() => {
        orderSubmit({ id: Number(productId) })
            .then((res) => {
                console.log('orderSubmit', res);
                if (res.errno === 0) {
                    ChatPrePay(res.data.id);
                } else if (res.errno === 401) {
                    Modal.error({
                        title: '登录',
                        content: '请登录后在使用',
                        footer: [
                            <Button key="login" onClick={wxlogin}>
                                登录
                            </Button>,
                            <Button
                                style={{ marginLeft: 10 }}
                                key="cancel"
                                onClick={() => {
                                    Modal.destroyAll();
                                }}
                            >
                                取消
                            </Button>,
                        ],
                    });
                } else {
                    message.error('充值出现异常，请稍后再试');
                }
            })
    }, [productId]);


    const handleCompletePayment = () => {
        // TODO: Add logic for completing payment
        setIsVisible(false);
        { PayCallback !== undefined ? PayCallback() : window.location.reload() }
    };

    const handleCancelPayment = () => {
        // TODO: Add logic for canceling payment
        setIsVisible(false);
        if (CancelCallback !== undefined) {
            CancelCallback();
        }
    };



    return (
        <Modal
            className='wx-pay'
            title="请使用微信扫码支付"
            open={isVisible}
            onCancel={handleCancelPayment}
            confirmLoading={confirmLoading}
            footer={[
                <Button key="complete" type="primary" onClick={handleCompletePayment}>
                    我已完成支付
                </Button>,
                <Button key="cancel" onClick={handleCancelPayment}>
                    取消支付
                </Button>,
            ]}
        >
            <Row justify="center" align="middle">
                <QRCode value={paymentData} />
            </Row>
        </Modal>
    );
};

export default WxPaymentModal;
