import React, { useEffect, useState } from 'react';

import '../index.less';

// props
type ClickCallback = (status: number) => void;

interface PriceHeaderProps {
  onClickCallBack: ClickCallback;
}
const PriceHeader: React.FC<PriceHeaderProps> = ({ onClickCallBack }) => {
  const showText: Array<string> = [
    '个性化数字人',
    'AI百宝助手',
    'AI画涂',
    '企业',
  ];
  // const showText: Array<IHeaderShowText> = [{ text: "个性化数字人", index: 0, text: "AI百宝助手", index:1, "AI画涂", "企业"}]

  const [headerState, setHeaderState] = useState<number>(0);

  useEffect(() => {
    // 在组件挂载后执行的副作用逻辑
    // 可以是数据获取、订阅事件、或其他需要在组件生命周期中处理的操作
    // 如果需要清理副作用，可以返回一个清理函数
    setHeaderState(0);
    // return () => {
    // 在组件卸载前执行的清理逻辑
    // 可以取消订阅、清除定时器、释放资源等
    // };
  }, []); // [] 中可以添加依赖项，当依赖项变化时，重新执行副作用逻辑

  const onClick = (newIndex: number): void => {
    setHeaderState(newIndex);
    onClickCallBack(newIndex);
  };

  //   return { state, updateState };
  return (
    <div className="price">
      <div className="price-header">
        {showText.map((item, index, _) => {
          // console.log(index)
          return index == headerState ? (
            <div
              className={`${'price-header-button'} ${'on-select'}`}
              key={index}
            >
              <div className="show-font" onClick={() => onClick(index)}>
                {item}
              </div>
            </div>
          ) : (
            <div className={`${'price-header-button'} ${'other'}`} key={index}>
              {' '}
              <div className="show-font" onClick={() => onClick(index)}>
                {item}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PriceHeader;
