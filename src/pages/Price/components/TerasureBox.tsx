import { Button, Col, Row } from 'antd';
import React, { useState } from 'react';
import { Row, Col } from 'antd'

import '../index.less';
import BuyCard from './BuyCard';


interface TerasureBoxProps { data: Array<IBuyInfo> }
const TerasureBox: React.FC<TerasureBoxProps> = ({ data }) => {
  const [selectState, setSelectState] = useState<number>(0);

  const changeSelect = (index: number) => {
    setSelectState(index);
  };

  return <>
    <div className='terasure-page'>
      <Row gutter={[41, 0]}>
        {data.map((item, index, _) => (
          <Col>
            <BuyCard info={item} isSelect={selectState == index} index={index} changeCallBack={changeSelect} /> :
          </Col>
        ))}
      </Row>


    </div>
  </>;
};

export default TerasureBox;
