import Exchange from '@/assets/images/exchange.svg';
import { RightOutlined } from '@ant-design/icons';
import {
  Table,
  message,
  Button,
  Divider
} from 'antd';
import { useEffect, useState, useMemo } from 'react';
import './index.less';


const Index = () => {
  const columns = [
    {
      title: '会员种类',
      dataIndex: '会员种类',
      key: '会员种类',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '会员等级',
      dataIndex: '会员等级',
      key: 'a2',
      align:'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '购买时间',
      dataIndex: '购买时间',
      key: '购买时间',
      align:'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '到期时间',
      dataIndex: '到期时间',
      key: '到期时间',
      align:'center',
      render: (text) => <a>{text}</a>,
    },
    {
      title: '购买价格',
      dataIndex: '购买价格',
      key: '购买价格',
      render: (text) => <a>{text}</a>,
    },
  ]
  const data = [
    {
      id: 0,
      会员种类: '1',
      a2: 'John Brown',
      购买时间: '2011-11-11 11:11:11',
      到期时间: '2011-11-12 11:11:11',
      购买价格: 23,
    },
    {
      id: 1,
      会员种类: '2',
      a2: 'John Brown',
      购买时间: '2011-11-11 11:11:11',
      到期时间: '2011-11-12 11:11:11',
      购买价格: 23,
    },
  ]
  const getList = useMemo(()=>{
    const formatList = data.map(item=>{
      return Object.keys(item).map(key=>{
        const targetColumn = columns.find(column=>column.key==key);
        if(targetColumn){
          return  {
            label: targetColumn.title,
            value: item[key]
          }
        }
        return null
      })
    })
    return formatList.map(item=>{
      return item.filter(i=>i)
    })
  },[data])
  console.log(123, getList);
  
  return <div className='member-server-page'>
    <div className="list">
      <div className='item'>
        <div className="item-label">AI百宝助手</div>
        <div className='item-main flex w100'>
          <div className='item-left'>
            <div>当前会员：体验版</div>
            <div>剩余对话次数：10 次</div>
          </div>
          <div className='item-center'>
            <Button className='primary-btn' size='small' type='primary'>购买会员</Button>
          </div>
          <div className='item-right'>
            <div>当前会员：VIP1</div>
            <div>剩余对话次数：无限</div>
            <div>套餐到期时间：2023-04-15 00:00:00</div>
          </div>
        </div>
      </div>
      <div className='item'>
        <div className="item-label">AI画涂</div>
        <div className='item-main flex w100'>
          <div className='item-left'>
            <div>剩余画贝：12.3 画贝</div>
          </div>
          <div className='item-center'>
            <Button className='primary-btn' size='small' type='primary'>购买画贝</Button>
          </div>
        </div>
      </div>
      <div className='item'>
        <div className="item-label">个性化数字人</div>
        <div className='item-main flex w100'>
          <div className='item-left'>
            <div>当前会员：体验版</div>
          </div>
          <div className='item-center'>
            <Button className='primary-btn' size='small' type='primary'>购买会员</Button>
          </div>
          <div className='item-right'>
            <div>当前会员：VIP1</div>
            <div>套餐到期时间：2023-04-15 00:00:00</div>
          </div>
        </div>
      </div>
    </div>
    <Divider/>
    <div className="table-box">
      <div className="table-label">历史购买记录</div>
      <Table className='table-dom' columns={columns} dataSource={data} rowKey='id' pagination={false}/>
      <div className="buy-list">
        {getList.map((item,index)=>{
          return <div className="buy-item" key={index}>
          {item.map(i=>(
            <div key={i.label}>{i.label}: {i.value}</div>
          ))}
        </div>
        })}
      </div>
    </div>
  </div>
}

export default Index;