import React, { useState } from 'react';


import '../index.less';

type ClickCallback = (status: number) => void;


interface PriceHeaderProps {
  defaultSelect: number,
  onClickCallBack: ClickCallback;
}
const PriceHeader: React.FC<PriceHeaderProps> = ({ defaultSelect, onClickCallBack }) => {
  const showText: Array<string> = [
    '个性化数字人',
    'AI百宝助手',
    'AI画涂',
    '企业',
  ];

  const thisHeader = defaultSelect < 0 ? 0 : defaultSelect


  const [headerState, setHeaderState] = useState<number>(thisHeader);


  const onClick = (newIndex: number): void => {
    setHeaderState(newIndex);
    onClickCallBack(newIndex);
  };

  return (
    <div className='price'>
      <div className={`${"price-header"} ${"header"}`}>
        {showText.map((item, index, _) => {

          return (index === headerState) ? (
            <div
              className={`${'price-header-button'} ${'on-select'}`}
              key={item + index}
            >
              <div className="show-font" onClick={() => onClick(index)}>
                {item}
              </div>
            </div>
          ) : (
            <div className={`${'price-header-button'} ${'other'}`} key={item + index}>
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
