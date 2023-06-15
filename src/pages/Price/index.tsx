import { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import ContentLayout from '@/layouts/index';

import './index.less';
import PriceHeader from './components/PriceHeader';
import Enterprise from './components/Enterprise';
import Personalise from './components/Personalise';
import Painted from './components/Painted';
import TerasureBox from './components/TerasureBox';
type StateType = {
  // 在这里定义你的状态类型
};

// const PricePage = (): { state: StateType; updateState: (newValue: StateType) => void } => {
//   const [state, setState] = useState<StateType>(initialState);
const PricePage = () => {
  // 初始位置是0
  const [headerSelect, setHeaderSelect] = useState<number>(0);

  //   useEffect(() => {
  // 在组件挂载后执行的副作用逻辑
  // 可以是数据获取、订阅事件、或其他需要在组件生命周期中处理的操作
  // 如果需要清理副作用，可以返回一个清理函数
  // return () => {
  // 在组件卸载前执行的清理逻辑
  // 可以取消订阅、清除定时器、释放资源等
  // };
  //   }, []); // [] 中可以添加依赖项，当依赖项变化时，重新执行副作用逻辑

  //   const updateState = (newValue: StateType): void => {
  //     setState(newValue);
  //   };

  //   return { state, updateState };
  const handleHeaderClick = (select: number) => {
    console.log('new index => ', select);
    setHeaderSelect(select);
  };

  return (
    <>
      <ContentLayout>
        <PriceHeader onClickCallBack={handleHeaderClick} />
        <div style={{ display: headerSelect == 0 ? '' : 'none' }}>
          <Personalise />
        </div>
        <div style={{ display: headerSelect == 1 ? '' : 'none' }}>
          <TerasureBox />
        </div>
        <div style={{ display: headerSelect == 2 ? '' : 'none' }}>
          <Painted />
        </div>
        <div style={{ display: headerSelect == 3 ? '' : 'none' }}>
          <Enterprise />
        </div>
      </ContentLayout>
    </>
  );
};

export default PricePage;
