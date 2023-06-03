import styles from './index.less';
import { Row, Col, Card, Typography } from 'antd';

import HeaderComponent from '../components/Header';
import ContainerComponent from '../components/Container';
import TipsCard from '../components/TipsCard';
import HomeImg1 from '@/assets/images/home-img-1.png';
import HomeImg2 from '@/assets/images/home-img-2.png';
import { getLatestUsedScenes } from '@/service/api';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';

const { Title } = Typography;

export default function IndexPage() {
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    getLatestUsedScenes()
      .then((res) => {
        console.log('getLatestUsedScenes', res.data);
        setCardData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <HeaderComponent />

      <ContainerComponent>
        <Row style={{ marginTop: '24px', marginBottom: '24px' }}>
          <Col span={12}>
            <img
              src={HomeImg1}
              style={{ height: '280px', borderRadius: '12px' }}
            />
          </Col>
          <Col span={12}>
            <img
              src={HomeImg2}
              style={{ height: '280px', borderRadius: '12px' }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>最近使用</Title>
          </Col>
          {cardData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <NavLink to={`/tips/bag/chat/${card.id}`}>
                <TipsCard
                  title={card.name}
                  description={card.scene_desc}
                  style={{ height: '120px' }}
                />
              </NavLink>
            </Col>
          ))}
          {/* 其他 TipsCard 组件... */}
        </Row>
      </ContainerComponent>
    </div>
  );
}
