import { Card } from 'antd';
import './TipsCard.less'; // 导入自定义的CSS文件

const TipsCard = ({
  title,
  description,
  style = { height: '120px', overflow: 'hidden', textOverflow: 'ellipsis' },
}) => {
  return (
    <Card className="tips-card" style={style}>
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </Card>
  );
};

export default TipsCard;
