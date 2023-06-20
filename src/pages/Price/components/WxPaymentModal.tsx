import React, { useEffect, useState } from 'react';
import { Modal, Button, Row, message } from 'antd';
import QRCode from 'qrcode.react';
import { orderSubmit, prePay } from '@/service/api';



const WxPaymentModal = ({ productId }) => {

    const [paymentData, setPaymentData] = useState<string>('');

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const ChatPrePay = (orderId) => {
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
        orderSubmit({ id: productId })
            .then((res) => {
                console.log('orderSubmit', res);
                if (res.errno === 0) {
                    ChatPrePay(res.data.id);
                } else {
                    message.error('充值出现异常，请稍后再试');
                }
            })
    }, [productId]);


    const handleCompletePayment = () => {
        // TODO: Add logic for completing payment
        setIsVisible(false);
        window.location.reload();
    };

    const handleCancelPayment = () => {
        // TODO: Add logic for canceling payment
        setIsVisible(false);
    };



    return (
        <Modal
            title="请使用微信扫码支付"
            visible={isVisible}
            onCancel={handleCancelPayment}
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
                <QRCode value={paymentData} alt="WeChat Pay QR Code" />
            </Row>
        </Modal>
    );
};

export default WxPaymentModal;
