import React, { useState } from 'react';
import { Row, Col, Button } from 'antd'

import '../index.less';

interface IVipInfo {
  title: string
  price: string
  priceUnit: string
  disablePrice: string
  hit: string
  buttonText: string
}

interface VipBoxProps {
  info: IVipInfo,
  isSelect: boolean,
  index: number,
  changeCallBack: (idx: number) => void
}
const VipBox: React.FC<VipBoxProps> = ({ info, isSelect, index, changeCallBack }) => {
  const click = () => {
    changeCallBack(index)
  }


  return <>
    {
      isSelect ? <div className={`${'vip-box'} ${'un-select'}`} onClick={click}>
        <span className='title'>{info.title}</span>
        <div className='price-line'>
          {info.disablePrice == '' ?
            <span className='price1'>{info.price}</span> :
            <div>
              <span className='price1'>¥{info.price}</span>
              <span className='price2'>/{info.priceUnit}</span>
              <span className='disable'>¥{info.disablePrice}</span>
            </div>
          }
        </div>
        <span className='hit'>{info.hit}</span>
        <Button className={`${'buy-btn'} ${'un-select'}`}>{info.buttonText}</Button>

      </div> :
        <div className={`${'vip-box'} ${'is-select'}`}>
          <span className='title'>{info.title}</span>
          <div className='price-line'>
            {info.disablePrice == '' ?
              <span className='price1'>{info.price}</span> :
              <div>
                <span className='price1'>¥{info.price}</span>
                <span className='price2'>/{info.priceUnit}</span>
                <span className='disable'>¥{info.disablePrice}</span>
              </div>
            }
          </div>
          <span className='hit'>{info.hit}</span>
          <Button className={`${'buy-btn'} ${'select'}`}>{info.buttonText}</Button>
        </div>
    }
  </>
}



interface TerasureBoxProps { data: Array<IVipInfo> }
const TerasureBox: React.FC<TerasureBoxProps> = ({ data }) => {
  const [selectState, setSelectState] = useState<number>(0);

  const changeSelect = (index: number) => {
    setSelectState(index)
  }

  return <>
    <div className='terasure-page'>
      <Row gutter={[41, 0]}>
        {data.map((item, index, _) => (
          <Col>
            {selectState == index ?
              <VipBox info={item} isSelect={false} index={index} changeCallBack={changeSelect} /> :
              <VipBox info={item} isSelect={true} index={index} changeCallBack={changeSelect} />
            }
          </Col>
        ))}
      </Row>


    </div>
  </>;
};

export default TerasureBox;
