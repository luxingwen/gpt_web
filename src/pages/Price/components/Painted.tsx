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
            <span className="price1">{info.num}</span>
            <span className="price2">画贝</span>
          </div>
          <span className="hit2">¥{info.price}</span>
        </div>
      ) : (
        <div className={`${'huabei'} ${'un-select'}`} onClick={click}>
          <div>
            <span className="price1">{info.num}</span>
            <span className="price2">画贝</span>
          </div>
          <span className="hit1">¥{info.price}</span>
        </div>
      )}
    </>
  );
};

interface PainteedProps {
  data: Array<IHuaBei>;
}
const Painted: React.FC<PainteedProps> = ({ data }) => {
  const [selectState, setSelectState] = useState<number>(0);

  const changeSelectCallBack = (index: number) => {
    setSelectState(index);
  };

  return (
    <>
      <div className="painted">
        <div className="body">
          <div className="huabei-box">
            <Space direction={'vertical'} size={55}>
              <Row gutter={[67, 0]}>
                <Col span={8}>
                  {' '}
                  <HuabeiBox
                    info={data[0]}
                    isSelect={selectState == 0}
                    index={0}
                    changeSelect={changeSelectCallBack}
                  />
                </Col>
                <Col span={8}>
                  {' '}
                  <HuabeiBox
                    info={data[1]}
                    isSelect={selectState == 1}
                    index={1}
                    changeSelect={changeSelectCallBack}
                  />
                </Col>
                <Col span={8}>
                  {' '}
                  <HuabeiBox
                    info={data[2]}
                    isSelect={selectState == 2}
                    index={2}
                    changeSelect={changeSelectCallBack}
                  />
                </Col>
              </Row>
              <Row gutter={[67, 0]}>
                <Col span={8}>
                  {' '}
                  <HuabeiBox
                    info={data[3]}
                    isSelect={selectState == 3}
                    index={3}
                    changeSelect={changeSelectCallBack}
                  />
                </Col>
                <Col span={8}>
                  {' '}
                  <HuabeiBox
                    info={data[4]}
                    isSelect={selectState == 4}
                    index={4}
                    changeSelect={changeSelectCallBack}
                  />
                </Col>
                <Col span={8}>
                  {' '}
                  <HuabeiBox
                    info={data[5]}
                    isSelect={selectState == 5}
                    index={5}
                    changeSelect={changeSelectCallBack}
                  />
                </Col>
              </Row>
            </Space>
            <Button className="buy-btn">购买</Button>
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
          </table>
        </div>
      </div>
    </>
  );
};

export default Painted;
