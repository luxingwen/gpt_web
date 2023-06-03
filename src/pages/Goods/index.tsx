import React, { useEffect } from 'react';
import { Card, Button } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import ContentLayout from '@/layouts/index';
import { getGoods } from '@/service/api';

const ProductPage = () => {
  const [goods, setGoods] = React.useState([]);

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

  const handleClick = (productId) => {
    console.log('User clicked on product id: ', productId);
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
    </ContentLayout>
  );
};

export default ProductPage;
