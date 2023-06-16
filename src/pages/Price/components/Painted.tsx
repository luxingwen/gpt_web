import React, { useState } from 'react';
import { Row, Col } from 'antd';

import '../index.less';

interface PainteedProps {}
const Painted: React.FC<PainteedProps> = ({}) => {
  const [headerState, setHeaderState] = useState<number>(0);

  return (
    <>
      <div className="painted">
        <div>
          <Row gutter={[58, 55]}>
            <Col span={8}>Column 1</Col>
            <Col span={8}>Column 2</Col>
            <Col span={8}>Column 3</Col>
          </Row>
          <Row gutter={[58, 55]}>
            <Col span={8}>Column 4</Col>
            <Col span={8}>Column 5</Col>
            <Col span={8}>Column 6</Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Painted;
