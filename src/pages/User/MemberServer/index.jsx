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
import { orderList } from '@/service/api';
import { formatTimestamp } from '@/utils/utils';
import { useModel, Link } from '@umijs/max';


const Index = () => {


  const { initialState, setInitialState } = useModel('@@initialState');

  const [payOrderList, setPayOrderList] = useState([]); // 已支付订单列表
  const fetchUserInfo = initialState?.fetchUserInfo;

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    orderList().then((res) => {
      console.log("orderList:", res);
      if (res.errno === 0) {
        let reslist = res.data?.data.filter((item) => item.pay_time !== 0);
        console.log("reslist:", reslist);
        setPayOrderList(reslist);
      }
    });

    const fetUserData = async () => {
      const res = await fetchUserInfo?.();
      console.log("fetUserData res:", res);
      setUserInfo(res);
    };

    fetUserData();


  }, []);

  const columns = [
    {
      title: '会员种类',
      dataIndex: 'remark',
    },
    {
      title: '会员等级',
      dataIndex: 'a2',
      align: 'center',
    },
    {
      title: '购买时间',
      dataIndex: 'pay_time',
      align: 'center',
      render: (value) => <a>{formatTimestamp(value)}</a>,
    },
    {
      title: '到期时间',
      dataIndex: '到期时间',
      align: 'center',
    },
    {
      title: '购买价格',
      dataIndex: 'price',
      render: (text) => <a>¥{text / 100}</a>,
    },
  ]

  const getList = useMemo(() => {
    const formatList = payOrderList.map(item => {
      return Object.keys(item).map(key => {

        const targetColumn = columns.find(column => column.dataIndex == key);
        if (targetColumn) {
          return {
            label: targetColumn.title,
            value: item[key]
          }
        }
        return null
      })
    })
    return formatList.map(item => {
      return item.filter(i => i)
    })
  }, [payOrderList])

  return <div className='member-server-page'>
    <div className="list">
      <div className='item'>
        <div className="item-label">AI百宝助手</div>
        <div className='item-main flex w100'>
          <div className='item-left'>
            <div>当前会员：体验版</div>
            <div>剩余对话次数：{userInfo?.chat_times} 次</div>
          </div>
          <div className='item-center'>
            <Link to='/price'><Button className='primary-btn' size='small' type='primary'>购买会员</Button></Link>
          </div>
          <div className='item-right'>
            <div>当前会员：VIP1</div>
            <div>剩余对话次数：无限</div>
            <div>套餐到期时间：{formatTimestamp(userInfo?.chat_expired_at)}</div>
          </div>
        </div>
      </div>
      <Divider />
      <div className='item'>
        <div className="item-label">AI画涂</div>
        <div className='item-main flex w100'>
          <div className='item-left'>
            <div>剩余画贝：{userInfo?.draw_score} 画贝</div>
          </div>
          <div className='item-center'>
            <Link to='/price'><Button className='primary-btn' size='small' type='primary'>购买画贝</Button></Link>
          </div>
        </div>
      </div>
      <Divider />
      <div className='item'>
        <div className="item-label">个性化数字人</div>
        <div className='item-main flex w100'>
          <div className='item-left'>
            <div>当前会员：体验版</div>
          </div>
          <div className='item-center'>
            <Link to='/price'><Button className='primary-btn' size='small' type='primary'>购买会员</Button></Link>
          </div>
          <div className='item-right'>
            <div>当前会员：VIP1</div>
            <div>套餐到期时间：{userInfo?.d_man_expired_at}</div>
          </div>
        </div>
      </div>
    </div>
    <Divider />
    <div className="table-box">
      <div className="table-label">历史购买记录</div>
      <Table className='table-dom' columns={columns} dataSource={payOrderList} rowKey='id' pagination={false} />
      <div className="buy-list">
        {getList.map((item, index) => {
          return <div className="buy-item" key={index}>
            {item.map(i => (
              <div key={i.label}>{i.label}: {i.value}</div>
            ))}
          </div>
        })}
      </div>
    </div>
  </div>
}

export default Index;