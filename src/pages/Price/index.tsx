import { Layout, Spin } from 'antd';
import { useState, useEffect } from 'react';

import Enterprise from './components/Enterprise';
import Painted from './components/Painted';
import Personalise from './components/Personalise';
import PriceHeader from './components/PriceHeader';
import TerasureBox from './components/TerasureBox';

import { queryChatGoods } from '@/service/api';
import './index.less';

const { Content } = Layout;

interface IPriceData {
  terasureBoxData: Array<IBuyInfo>
  aiHuatuData: Array<IHuaBei>
  personData: Array<IPersonCard>
  personBuyData: Array<IBuyInfo>
}

const PricePage = () => {
  const [headerSelect, setHeaderSelect] = useState<number>(0);
  const [priceData, setPriceData] = useState<IPriceData>();
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const handleHeaderClick = (select: number) => {
    console.log('new index => ', select);
    setHeaderSelect(select);
  };

  useEffect(() => {
    loadingData().then((res) => {
      console.log("data => ", res)
      setPriceData(res)
    })
  }, [])


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


  const backData2buyData = (data: Array<IBackData>): Array<IBuyInfo> => {
    data = sortData(data)

    const retData: Array<IBuyInfo> = []

    for (const item of data) {
      retData.push({
        id: String(item.id), title: item.title, price: String(item.actual_price / 100),
        disablePrice: String(item.price / 100), buttonText: "购买",
        priceUnit: datelong2unit(item.time_period)
      })
    }
    return retData
  }

  const backData2AihuatuData = (data: Array<IBackData>): Array<IHuaBei> => {
    data = sortData(data)
    const retData: Array<IHuaBei> = []

    for (const item of data) {
      retData.push({
        id: String(item.id), price: item.price / 100,
        num: Number(item.title.replace("画贝", ""))
      })
    }

    return retData
  }

  const backData2personCardData = (data: Array<IBackData>): Array<IPersonCard> => {
    data = sortData(data)
    const retData: Array<IPersonCard> = []
    const freeData: IPersonCard = {
      id: "free-card",
      title: '体验版',
      price: '免费',
      priceUnit: '',
      hit: ['1个场景', '文件上传大小限制 1MB/文件', '文件上传个数限制 1个文件', '权限设置', '分享出去后，使用数字人的人数限制：20人/数字人', '分享出去后，使用者和数字人对话限制：10次/人'],
      buttonText: '去使用',
      isHot: false,
    }
    retData.push(freeData)

    for (const item of data) {
      retData.push({
        id: String(item.id), title: item.title, price: String(item.price / 100),
        priceUnit: datelong2unit(item.time_period), buttonText: '购买',
        hit: []
      })
    }


    return retData
  }


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

  return (
    <>
      <Content>
        {isLoading ? <Spin /> :
          <div>
            <PriceHeader onClickCallBack={handleHeaderClick} />
            <div style={{ display: headerSelect == 0 ? '' : 'none' }}>
              <Personalise digitalHumanData={priceData?.personData} buyData={priceData?.personBuyData} />
            </div>
            <div style={{ display: headerSelect == 1 ? '' : 'none' }}>
              <TerasureBox data={priceData!.terasureBoxData} />
            </div>
            <div style={{ display: headerSelect == 2 ? '' : 'none' }}>
              <Painted data={priceData!.aiHuatuData} />
            </div>
            <div style={{ display: headerSelect == 3 ? '' : 'none' }}>
              <Enterprise />
            </div>
          </div>
        }
      </Content>
    </>
  );
};

export default PricePage;
