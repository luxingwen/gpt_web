import React from 'react';
import { Button } from 'antd'



interface BuyCardProps {
    info: IBuyInfo,
    isSelect: boolean,
    index: number,
    changeCallBack: (idx: number) => void
}
const BuyCard: React.FC<BuyCardProps> = ({ info, isSelect, index, changeCallBack }) => {
    const click = () => {
        changeCallBack(index)
    }


    return <>
        <div className='buy-card'>
            {
                isSelect ? <div className={`${'vip-box'} ${'is-select'}`} >
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

                </div> :
                    <div className={`${'vip-box'} ${'un-select'}`} onClick={click}>
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
                        <Button className={`${'buy-btn'} ${'is-select'}`}>{info.buttonText}</Button>
                    </div>
            }
        </ div>
    </>
}

export default BuyCard;