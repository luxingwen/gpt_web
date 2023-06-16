import styles from './index.less';
import { Row, Col, Card, Typography, message } from 'antd';
import TipsCard from '@/components/TipsCard';
import HomeImg1 from '@/assets/images/home-img-1.png';
import HomeImg2 from '@/assets/images/home-img-2.png';
import { getLatestUsedScenes } from '@/service/api';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate  } from 'react-router-dom';


import storage from '@/utils/storage';

const { Title } = Typography;

export default function IndexPage() {
  const navigate = useNavigate();
  const [cardData, setCardData] = useState([]);
  const [userInfo, setUserInfo] = useState(storage.getItem('userInfo'));

  useEffect(() => {
    getLatestUsedScenes()
      .then((res) => {
        if (res.data && res.data.data && res.data.data.length > 0) {
          setCardData(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleHotCardClick = () => {
    navigate(`/tips/bag`);
  };

  const handleGiftCardClick = () => {
    if (!userInfo) {
      message.error('请先登录');
      return;
    }
    navigate(`/user/redemption`);
  };

  return (
    <div>
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
            <Card onClick={handleGiftCardClick}>
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
          {(cardData || []).map((card, index) => (
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
    </div>
  );
}
