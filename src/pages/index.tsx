import styles from './index.less';
import { Row, Col, Card, Typography } from 'antd';

import HeaderComponent from '../components/Header';
import ContainerComponent from '../components/Container';
import TipsCard from '../components/TipsCard';
import HomeImg1 from '@/assets/images/home-img-1.png';
import HomeImg2 from '@/assets/images/home-img-2.png';

const { Title } = Typography;

export default function IndexPage() {
  const cardData = [
    { title: '标题1', description: '描述1' },
    { title: '标题2', description: '描述2' },
    { title: '标题3', description: '描述3' },
    { title: '标题1', description: '描述1' },
    { title: '标题2', description: '描述2' },
    { title: '标题3', description: '描述3' },
    { title: '标题1', description: '描述1' },
    { title: '标题2', description: '描述2' },
    {
      title: '标题3',
      description: '描述31111111111111111111111111111111s222111111111',
    },
    // 更多数据...
  ];

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
              <TipsCard
                title={card.title}
                description={card.description}
                style={{ height: '120px' }}
              />
            </Col>
          ))}
          {/* 其他 TipsCard 组件... */}
        </Row>
      </ContainerComponent>
    </div>
  );
}
