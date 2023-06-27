import { Layout, Spin } from 'antd';
import { useState, useEffect } from 'react';

import Enterprise from './components/Enterprise';
import Painted from './components/Painted';
import Personalise from './components/Personalise';
import PriceHeader from './components/PriceHeader';
import TerasureBox from './components/TerasureBox';

import { queryChatGoods } from '@/service/api';
import './index.less';
import { useSearchParams, history } from '@umijs/max';
import WxPaymentModal from './components/WxPaymentModal';


const { Content } = Layout;

interface IPriceData {
  terasureBoxData: Array<IBuyInfo>
  aiHuatuData: Array<IHuaBei>
  personData: Array<IPersonCard>
  personBuyData: Array<IBuyInfo>
}


const PricePage = () => {

  enum GoodsType {
    QnA = 0, // AI问答
    Drawing = 1, // AI画图
    DigitalPackage = 2, // 数字人套餐
    ConversationCount = 3, // 与数字人对话次数
    Enterprise = 4, // 企业信息
  }

  const [searchParams, _] = useSearchParams();

  const paramMap: Map<number, number> = new Map([
    [GoodsType.DigitalPackage, 0],
    [GoodsType.ConversationCount, 1],
    [GoodsType.QnA, 2],
    [GoodsType.Drawing, 3],
    [GoodsType.Enterprise, 4],
  ])

  const param2HeaderIdx = (param: string | null): number => {
    if (param == null) {
      return 0
    }

    const result = paramMap.get(Number(param))
    return result == undefined ? 0 : result
  }



  const param = param2HeaderIdx(searchParams.get('type'))

  const defaultSelect = (param === null ? 0 : param)

  const [headerSelect, setHeaderSelect] = useState<number>(defaultSelect);
  const [priceData, setPriceData] = useState<IPriceData>();
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const [buyProductId, setbuyProductId] = useState<string>('')
  const [showBuyModel, setshowBuyModel] = useState(false)

  const handleHeaderClick = (select: number) => {
    setHeaderSelect(select + 1);
  };

  // util function

  const datelong2unit = (num: number): string => {
    switch (num) {
      case 1:
        return '日'
      case 7:
        return '周'
      case 30:
        return '月'
      case 365:
        return '年'
      default:
        return '季'
    }
  }

  const sortData = (data: IBackData[]): IBackData[] => {
    data.sort((a, b) => {
      if (a.price < b.price) {
        return -1;
      } else if (a.price > b.price) {
        return 1;
      } else {
        return 0;
      }
    });
    return data
  }

  const backData2buyData = (data: Array<IBackData>): Array<IBuyInfo> => {
    const newData = sortData(data)

    const retData: Array<IBuyInfo> = []

    for (const item of newData) {
      retData.push({
        id: String(item.id), title: item.title, price: String(item.actual_price / 100),
        disablePrice: String(item.price / 100), buttonText: "购买",
        priceUnit: datelong2unit(item.time_period)
      })
    }
    return retData
  }

  const backData2AihuatuData = (data: Array<IBackData>): Array<IHuaBei> => {
    const newData = sortData(data)
    const retData: Array<IHuaBei> = []

    for (const item of newData) {
      retData.push({
        id: String(item.id), price: item.price / 100,
        num: Number(item.title.replace("画贝", ""))
      })
    }

    return retData
  }

  const backData2personCardData = (data: Array<IBackData>): Array<IPersonCard> => {
    const newData = sortData(data)
    const retData: Array<IPersonCard> = []
    const freeData: IPersonCard = {
      id: "free",
      title: '体验版',
      price: '免费',
      priceUnit: '',
      hit: ['1个场景', '文件上传大小限制 1MB/文件', '文件上传个数限制 1个文件', '权限设置', '分享出去后，使用数字人的人数限制：20人/数字人', '分享出去后，使用者和数字人对话限制：10次/人'],
      buttonText: '去使用',
      isHot: false,
    }
    retData.push(freeData)

    for (const item of newData) {
      retData.push({
        id: String(item.id), title: item.title, price: String(item.price / 100),
        priceUnit: datelong2unit(item.time_period), buttonText: '购买',
        hit: []
      })
    }


    return retData
  }


  const loadingData = async () => {

    setIsLoading(true)

    const recvData: IPriceData = {
      terasureBoxData: [],
      aiHuatuData: [],
      personData: [],
      personBuyData: []
    }

    await queryChatGoods({ type: 0 }).then((res) => {
      const buydata = backData2buyData((res.data as Array<IBackData>))
      const freeData: IBuyInfo = {
        id: 'free',
        title: '体验版',
        price: '免费',
        priceUnit: '',
        disablePrice: '',
        hit: '10次对话次数',
        buttonText: '去使用',
      }

      buydata.unshift(freeData)
      recvData.terasureBoxData = buydata
    })
    await queryChatGoods({ type: 1 }).then((res) => {
      const huabeiData = backData2AihuatuData((res.data as Array<IBackData>))
      recvData.aiHuatuData = huabeiData
    })
    await queryChatGoods({ type: 2 }).then((res) => {
      const personData = backData2personCardData((res.data as Array<IBackData>))
      recvData.personData = personData
    })
    await queryChatGoods({ type: 3 }).then((res) => {
      const buydata = backData2buyData((res.data as Array<IBackData>))
      recvData.personBuyData = buydata
    })

    setIsLoading(false)

    return recvData
  }



  useEffect(() => {
    loadingData().then((res) => {
      setPriceData(res)
    })
  }, [])


  const handleCancelBuy = () => {
    console.log("do cancel")
    setshowBuyModel(false)
  }
  const handleBuy = (productId: string) => {
    if (productId != 'free') {
      setbuyProductId(productId)
      setshowBuyModel(true)
    } else {
      if (headerSelect == 2) {
        history.push('/ai')
      }
    }
  }

  const handleBuyCallBack = () => {
    setshowBuyModel(false)
  }

  return (
    <Content>
      {isLoading ?
        <div className='flex h-screen justify-center items-center'>
          <Spin />
        </div> :
        <>
          {showBuyModel ? <WxPaymentModal productId={buyProductId} PayCallback={handleBuyCallBack} CancelCallback={handleCancelBuy} /> : <></>}

          <div>
            <PriceHeader defaultSelect={headerSelect - 1} onClickCallBack={handleHeaderClick} />
            <div style={{ display: (headerSelect === 1 || headerSelect === 0) ? '' : 'none' }}>
              <Personalise defaultSelect={headerSelect} digitalHumanData={priceData?.personData} buyData={priceData?.personBuyData} buyCallBack={handleBuy} />
            </div>
            <div style={{ display: headerSelect === 2 ? '' : 'none' }}>
              <TerasureBox data={priceData!.terasureBoxData} buyCallBack={handleBuy} />
            </div>
            <div style={{ display: headerSelect === 3 ? '' : 'none' }}>
              <Painted data={priceData!.aiHuatuData} buyCallBack={handleBuy} />
            </div>
            <div style={{ display: headerSelect === 4 ? '' : 'none' }}>
              <Enterprise />
            </div>
          </div>
        </>
      }
    </Content>
  );
};

export default PricePage;
