import React, { useEffect, useState } from 'react';
import { Card, Button, message, Modal, Row, Col } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import ContentLayout from '@/layouts/index';
import { getGoods, orderSubmit, prePay } from '@/service/api';
import QRCode from 'qrcode.react';
import { useHistory } from 'react-router-dom';

const ProductPage = () => {
  const history = useHistory();
  const [goods, setGoods] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    getGoods()
      .then((res) => {
        console.log('getGoods', res.data);
        setGoods(res.data);
      })
      .catch((err) => {
        console.log('getGoods err', err);
      });
  }, []);

  const ChatPrePay = (orderId) => {
    console.log('ChatPrePay', orderId);
    prePay({ order_id: orderId, client: 'web' })
      .then((res) => {
        console.log('prePay', res);
        if (res.errno === 0) {
          setPaymentData(res.data.code_url);
          setIsModalVisible(true);
        } else {
          message.error('充值失败');
        }
      })
      .catch((err) => {
        console.log('prePay err', err);
        message.error('充值失败');
      });
  };

  const handleClick = (productId) => {
    console.log('User clicked on product id: ', productId);
    orderSubmit({ id: productId })
      .then((res) => {
        console.log('orderSubmit', res);
        if (res.errno === 0) {
          ChatPrePay(res.data.id);
        } else {
          message.error('充值失败');
        }
      })
      .catch((err) => {
        console.log('orderSubmit err', err);
        message.error('充值失败');
      });
  };

  const handleCompletePayment = () => {
    // TODO: Add logic for completing payment
    setIsModalVisible(false);
    history.push('/user/info');
  };

  const handleCancelPayment = () => {
    // TODO: Add logic for canceling payment
    setIsModalVisible(false);
  };

  return (
    <ContentLayout>
      <div
        style={{
          marginTop: '24px',
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
        }}
      >
        {goods.map((item) => (
          <Card
            key={item.id}
            hoverable
            style={{ width: 240, margin: '2px', textAlign: 'center' }}
          >
            <Card.Meta
              title={item.title}
              description={
                <p style={{ color: 'blue', fontSize: '32px' }}>
                  ￥{item.actual_price / 100}
                </p>
              }
            />
            <p style={{ fontSize: '18px', textDecoration: 'line-through' }}>
              ￥{item.price / 100}
            </p>
            <Button
              onClick={() => handleClick(item.id)}
              type="primary"
              icon={<DollarOutlined />}
            >
              充值
            </Button>
          </Card>
        ))}
      </div>

      <div style={{ marginTop: '24px', fontSize: '18px' }}>
        <p>购买须知</p>
        <ul>
          <li>1. 可以重复购买，有效期自动叠加</li>
          <li>2. 会员服务暂不支持退款</li>
          <li>3. 需要定制高级服务请加入社群联系群管理员</li>
          <li>4. 最终解释权归本公司所有</li>
        </ul>
      </div>

      <Modal
        title="请使用微信扫码支付"
        visible={isModalVisible}
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
    </ContentLayout>
  );
};

export default ProductPage;
