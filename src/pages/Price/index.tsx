import { Layout } from 'antd';
import { useState, useEffect } from 'react';

import Enterprise from './components/Enterprise';
import Painted from './components/Painted';
import Personalise from './components/Personalise';
import PriceHeader from './components/PriceHeader';
import TerasureBox from './components/TerasureBox';

import {queryChatGoods} from '@/service/api';
import './index.less';

type StateType = {
  // 在这里定义你的状态类型
};

const { Content } = Layout;

// AI百宝助手数据
const TerasureBoxData = [{
  title: '体验版',
  price: '免费',
  priceUnit: '',
  disablePrice: '',
  hit: '10次对话次数',
  buttonText: '去使用',
}, {
  title: 'VIP1',
  price: '5',
  priceUnit: '日',
  disablePrice: '6',
  hit: '不限对话次数',
  buttonText: '购买',
}, {
  title: 'VIP2',
  price: '62',
  priceUnit: '月',
  disablePrice: '99',
  hit: '不限对话次数',
  isHot: true,
  buttonText: '购买',
}, {
  title: 'VIP3',
  price: '298',
  priceUnit: '年',
  disablePrice: '398',
  hit: '不限对话次数',
  buttonText: '购买',
},]

// AI画涂数据
const AIHuatuData = [{
  num: 50,
  price: '5'
}, {
  num: 100,
  price: '10'
}, {
  num: 200,
  price: '20'
}, {
  num: 300,
  price: '30'
}, {
  num: 500,
  price: '50'
}, {
  num: 1000,
  price: '100'
},]

// 个性化数字人
const PersonaliseData = {
  digitalHuman: [{
    title: '体验版',
    price: '免费',
    priceUnit: '',
    hit: ['1个场景', '文件上传大小限制 1MB/文件', '文件上传个数限制 1个文件', '权限设置', '分享出去后，使用数字人的人数限制：20人/数字人', '分享出去后，使用者和数字人对话限制：10次/人'],
    buttonText: '去使用',
    isHot: false,
  }, {
    title: 'VIP1',
    price: '798',
    priceUnit: '月',
    hit: ['20个场景', '文件上传大小限制 10MB/文件', '文件上传个数限制 50个文件', '权限设置', '分享出去后，使用数字人的人数限制：100人/数字人', '分享出去后，使用者和数字人对话限制：100次/人'],
    buttonText: '购买',
    isHot: false,
  }, {
    title: 'VIP2',
    price: '7899',
    priceUnit: '年',
    hit: ['无限场景', '文件上传大小限制 10G/文件', '文件上传个数限制 1000个文件', '权限设置', '分享出去后，使用数字人的人数限制：无限/数字人', '分享出去后，使用者和数字人对话限制：100次/人'],
    buttonText: '购买',
    isHot: true,
  },]
}

// AI百宝助手数据
const BuyPersonaliseData = [
  {
    title: 'VIP1',
    price: '5',
    priceUnit: '日',
    disablePrice: '6',
    hit: '不限对话次数',
    buttonText: '购买',
  }, {
    title: 'VIP2',
    price: '62',
    priceUnit: '月',
    disablePrice: '99',
    hit: '不限对话次数',
    isHot: true,
    buttonText: '购买',
  }, {
    title: 'VIP3',
    price: '298',
    priceUnit: '年',
    disablePrice: '398',
    hit: '不限对话次数',
    buttonText: '购买',
  },]

const PricePage = () => {
  const [headerSelect, setHeaderSelect] = useState<number>(0);

  const handleHeaderClick = (select: number) => {
    console.log('new index => ', select);
    setHeaderSelect(select);
  };

  useEffect(() => {
    queryChatGoods({type:0}).then((res) => {
      console.log('res => ', res);
    })
  }, [])

  return (
    <>
      <Content>
        <PriceHeader onClickCallBack={handleHeaderClick} />
        <div style={{ display: headerSelect == 0 ? '' : 'none' }}>
          <Personalise digitalHumanData={PersonaliseData.digitalHuman} buyData={BuyPersonaliseData}/>
        </div>
        <div style={{ display: headerSelect == 1 ? '' : 'none' }}>
          <TerasureBox data={TerasureBoxData} />
        </div>
        <div style={{ display: headerSelect == 2 ? '' : 'none' }}>
          <Painted data={AIHuatuData} />
        </div>
        <div style={{ display: headerSelect == 3 ? '' : 'none' }}>
          <Enterprise />
        </div>
      </Content>
    </>
  );
};

export default PricePage;
