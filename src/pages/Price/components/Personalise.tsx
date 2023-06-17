import React, { useState } from 'react';
import { Space, Row, Col, Button } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons';


import '../index.less';

interface PersonHeaderProps {
  select: number
  callBack: (index: number) => void
}
const PersonHeader: React.FC<PersonHeaderProps> = ({ select, callBack }) => {
  const showText: Array<string> = [
    '数字人',
    '与数字人对话次数',
  ];
  return <div className='price'>
    <div className={`${"price-header"} ${"digital-human"}`}>
      <Space direction={'horizontal'} size={14}>
        {showText.map((item, index, _) => {
          return select == index ? (
            <div
              className={`${'price-header-button'} ${'on-select'}`}
              key={index}
            >
              <div className="show-font" onClick={() => callBack(index)}>
                {item}
              </div>
            </div>
          ) : (
            <div className={`${'price-header-button'} ${'other'}`} key={index}>
              <div className="show-font" onClick={() => callBack(index)}>
                {item}
              </div>
            </div>
          );
        })}
      </Space >
    </div >
  </div >
}


interface IPersonCard {
  title: string
  price: string
  priceUnit: string
  hit: Array<string>
  buttonText: string
  isHot: boolean
}
interface PersonCardProps {
  select: number
  index: number
  info: IPersonCard
  callBack: (index: number) => void
}
const PersonCard: React.FC<PersonCardProps> = ({ select, index, info, callBack }) => {

  console.log(info.hit)
  return <>
    {
      index == select ?
        <div className={`${'card'} ${'is-select'}`}>
          <span className='title'>{info.title}</span>
          {
            info.priceUnit == '' ? <div>
              <span className='price1'>{info.price}</span>
            </div> :
              <div>
                <span className='price1'>¥{info.price}</span>
                <span className='price2'>/{info.priceUnit}</span>
              </div>
          }
          <div className='hit'>
            {info.hit.map((item, index, _) => (
              <div>
                <CheckCircleTwoTone className='c-icon' />
                <span key={item + index}>{item}</span>
              </div>
            ))}
          </div>

          <Button className={`${'buy-btn'} ${'btn-select'}`}>{info.buttonText}</Button>

        </div> :
        <div className={`${'card'} ${'un-select'}`} onClick={() => callBack(index)}>
          <span className='title'>{info.title}</span>
          {
            info.priceUnit == '' ? <div>
              <span className='price1'>{info.price}</span>
            </div> :
              <div>
                <span className='price1'>¥{info.price}</span>
                <span className='price2'>/{info.priceUnit}</span>
              </div>
          }
          <div className='hit'>
            {info.hit.map((item, index, _) => (
              <div>
                <CheckCircleTwoTone className='c-icon' />
                <span key={item + index}>{item}</span>
              </div>
            ))}
          </div>
          <Button className='buy-btn'>{info.buttonText}</Button>
        </div>
    }
  </>
}

interface PersonaliseProps {
  digitalHumanData: Array<IPersonCard>
}
const Personalise: React.FC<PersonaliseProps> = ({ digitalHumanData, }) => {

  const [headerSelectState, setHeaderSelectState] = useState<number>(0);
  const [cardSelectState, setCardSelectState] = useState<number>(0);

  const headerCallBack = (index: number) => {
    setHeaderSelectState(index)
  }

  const cardCallBack = (index: number) => {
    setCardSelectState(index)
  }

  return <>
    <div className='person'>
      <PersonHeader select={headerSelectState} callBack={headerCallBack} />
      <div className='card-list'>
        <Row gutter={73}>
          {digitalHumanData.map((item, index, _) => (
            <Col><PersonCard select={cardSelectState} index={index} callBack={cardCallBack} info={item} key={index} /></Col>
          ))}
        </Row>
      </div>
    </div>
  </>;
};

export default Personalise;
