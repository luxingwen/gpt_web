import React, { useEffect, useState } from 'react';
import { Space, Row, Col, Button } from 'antd'
import { CheckCircleTwoTone } from '@ant-design/icons';


import '../index.less';
import BuyCard from './BuyCard';

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
              key={item + index}
            >
              <div className="show-font" onClick={() => callBack(index)}>
                {item}
              </div>
            </div>
          ) : (
            <div className={`${'price-header-button'} ${'other'}`} key={item + index}>
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



interface PersonCardProps {
  select: number
  index: number
  info: IPersonCard
  callBack: (index: number) => void
}
const PersonCard: React.FC<PersonCardProps> = ({ select, index, info, callBack }) => {

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
            {info.hit?.map((item, index, _) => (
              <div key={item + index}>
                <CheckCircleTwoTone className='c-icon' />
                <span>{item}</span>
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
            {info.hit?.map((item, index, _) => (
              <div key={item + index}>
                <CheckCircleTwoTone className='c-icon' />
                <span>{item}</span>
              </div>
            ))}
          </div>
          <Button className='buy-btn'>{info.buttonText}</Button>
        </div>
    }
  </>
}

interface PersonaliseProps {
  digitalHumanData?: Array<IPersonCard>
  buyData?: Array<IBuyInfo>
}
const Personalise: React.FC<PersonaliseProps> = ({ digitalHumanData, buyData }) => {

  console.log("recv data => ", digitalHumanData)

  const [headerSelectState, setHeaderSelectState] = useState<number>(0);
  const [cardSelectState, setCardSelectState] = useState<number>(0);
  const [buyCardSelectState, setBuyCardSelectState] = useState<number>(0);

  const headerCallBack = (index: number) => {
    setHeaderSelectState(index)
  }

  const cardCallBack = (index: number) => {
    setCardSelectState(index)
  }

  const buyCallBack = (index: number) => {
    setBuyCardSelectState(index)
  }



  return <>
    <div className='person'>
      <PersonHeader select={headerSelectState} callBack={headerCallBack} />
      <div>
        {headerSelectState == 0 ?
          <div className='card-list'>
            <Row gutter={73}>
              {digitalHumanData?.map((item, index, _) => (
                <Col key={"col-" + item.id}><PersonCard key={item.id} select={cardSelectState} index={index} callBack={cardCallBack} info={item} /></Col>
              ))}
            </Row>
          </div> :
          <div className='buy-list'>
            <Row gutter={41}>
              {
                buyData?.map((item, index, _) => (
                  <Col key={"col-" + item.id}>
                    <BuyCard key={item.id} info={item} isSelect={buyCardSelectState == index} index={index} changeCallBack={buyCallBack} />
                  </Col>
                ))
              }
            </Row>
          </div>
        }
      </div>
    </div>
  </>
}

export default Personalise;
