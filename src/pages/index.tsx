import styles from './index.less';
import { Row, Col, Card, Typography } from 'antd';
import HeaderComponent from '../components/Header';
import ContentLayout from '@/layouts/index';
import TipsCard from '../components/TipsCard';
import HomeImg1 from '@/assets/images/home-img-1.png';
import HomeImg2 from '@/assets/images/home-img-2.png';
import { getLatestUsedScenes } from '@/service/api';
import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const { Title } = Typography;

export default function IndexPage() {
  const history = useHistory();
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

  const handleHotCardClick = () => {
    history.push(`/tips/bag`);
  };

  const handleGiftCardClick = () => {
    history.push(`/user/redemption`);
  };

  return (
    <div>
      <ContentLayout>
        <Row
          gutter={[16, 16]}
          style={{ marginTop: '24px', marginBottom: '24px' }}
        >
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card onClick={handleHotCardClick}>
              <div className={styles['image-container']}>
                <img src={HomeImg1} alt="Home Image 1" />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Card>
              <div className={styles['image-container']}>
                <img src={HomeImg2} alt="Home Image 2" />
              </div>
            </Card>
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
        </Row>
      </ContentLayout>
    </div>
  );
}
