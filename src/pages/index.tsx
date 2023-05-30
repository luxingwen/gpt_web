import styles from './index.less';
import { Row, Col, Card, Typography } from 'antd';

import HeaderComponent from '../components/Header';
import ContainerComponent from '../components/Container';

const { Title } = Typography;

const TipsCard = ({
  title,
  description,
  style = {
    height: '120px',
    overflow: 'hidden', // 隐藏超出部分
    textOverflow: 'ellipsis', // 超出部分用...代替
  },
}) => {
  const cardStyle = {
    borderRadius: '10px', // 设置边框弧度
    ...style, // 传入的style覆盖默认样式
  };

  const titleStyle = {
    fontSize: '18px', // 设置标题字体大小
    fontWeight: 'bold', // 设置标题字体粗细
  };

  const descriptionStyle = {
    fontSize: '14px', // 设置描述字体大小
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2, // 限制在一个块元素显示的文本的行数。
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis',
  };

  return (
    <Card style={cardStyle}>
      <div style={titleStyle}>{title}</div>
      <div style={descriptionStyle}>{description}</div>
    </Card>
  );
};

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
        <Row>
          <Col span={12}>hhh</Col>
          <Col span={12}>aaa</Col>
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
