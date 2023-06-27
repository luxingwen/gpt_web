import React, { useState } from 'react';
import { Space, Row, Col, Button } from 'antd';

import '../index.less';


interface HuabeiBoxProps {
  info: IHuaBei;
  isSelect: boolean;
  index: number;
  changeSelect: (idx: number) => void;
}
const HuabeiBox: React.FC<HuabeiBoxProps> = ({
  info,
  isSelect,
  index,
  changeSelect,
}) => {
  const click = () => {
    changeSelect(index);
  };

  return (
    <>
      {isSelect ? (
        <div className={`${'huabei'} ${'is-select'}`}>
          <div>
            <span className="price1">{info?.num}</span>
            <span className="price2">画贝</span>
          </div>
          <span className="hit2">¥{info?.price}</span>
        </div>
      ) : (
        <div className={`${'huabei'} ${'un-select'}`} onClick={click}>
          <div>
            <span className="price1">{info?.num}</span>
            <span className="price2">画贝</span>
          </div>
          <span className="hit1">¥{info?.price}</span>
        </div>
      )}
    </>
  );
};

interface PainteedProps {
  data: Array<IHuaBei>;
  buyCallBack: (productId: string) => void;
}
const Painted: React.FC<PainteedProps> = ({ data, buyCallBack }) => {
  const [selectState, setSelectState] = useState<number>(0);

  const changeSelectCallBack = (index: number) => {
    setSelectState(index);
  };

  return (
    <>
      {data.length > 0 ?

        <div className="painted">
          <div className="body">
            <div className="huabei-box">
              <div className='grid grid-cols-3 gap-x-16 gap-y-14'>
                {data.map((item, index, _) => (
                  <HuabeiBox
                    key={item.id}
                    info={item}
                    isSelect={selectState == index}
                    index={index}
                    changeSelect={changeSelectCallBack}
                  />
                ))}
              </div>
              <Button className="buy-btn" onClick={() => buyCallBack(data[selectState].id)}>购买</Button>
            </div>
            <div className="point">
              <span>说明： </span>
              <span>
                1. 用户可用画贝购买小程序内虚拟内容（绘画时将会消耗画贝）；{' '}
              </span>
              <span>
                2. 画贝是虚拟币，充值后将不会过期，且一旦充值后将不支持退款；{' '}
              </span>
              <span>3. 平台将给每个新用户赠送10画贝试用； </span>
              <span>
                4.
                您在绘制图片时，平台将自动计算消耗画贝数量，数量不足时，需要先充值画贝再使用绘画功能；{' '}
              </span>
              <span>
                5. 平台将根据画质像素大小，消耗画贝。像素和画贝计算表如下所示：{' '}
              </span>
            </div>

            <table className="mytable">
              <tbody>
                <tr>
                  <th>像素</th>
                  <th>画图/张图</th>
                </tr>
                <tr>
                  <td>512*512</td>
                  <td>1.5</td>
                </tr>
                <tr>
                  <td>512*682</td>
                  <td>1.8</td>
                </tr>
                <tr>
                  <td>682*512</td>
                  <td>1.8</td>
                </tr>
                <tr>
                  <td>512*910</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>910*512</td>
                  <td>2</td>
                </tr>
                <tr>
                  <td>1024*1024</td>
                  <td>2.9</td>
                </tr>
                <tr>
                  <td>1024*1364</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>1364*1024</td>
                  <td>3</td>
                </tr>
                <tr>
                  <td>1024*1820</td>
                  <td>4.5</td>
                </tr>
                <tr>
                  <td>1820*1024</td>
                  <td>4.5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div > :
        <></>
      }
    </>
  );
};

export default Painted;
