import React from 'react';

import '../index.less';
import { Row, Col, Space, Image, Form, Button, Input } from 'antd';

interface EainteedProps { }
const Enterprise: React.FC<EainteedProps> = ({ }) => {

  return <div className='enterprise'>
    <div className='page'>
      <Row gutter={12}>
        <Col span={12}>
          <div className='left'>
            <Space direction='vertical' size={'small'}>
              <div>
                <div className='style1'>+86 13555285662</div>
                <div className='style2'>咨询热线</div>
              </div>
              <div>
                <div className='style1'>13544285662@163.com</div>
                <div className='style2'>商务合作</div>
              </div>
              <Image src='https://www.kimways.com/_next/image?url=%2F168312753179241b2363a3e7042ad.jpg&w=256&q=75' width={200} />
              <div className='style2'>扫码添加好友，备注'商务合作'</div>
            </Space>
          </div>
        </Col>
        <Col span={12}>
          <div className='right'>
            <Form name="form_item_path" layout="vertical" onFinish={() => { }}>
              <Form.Item name="tel" label="联系电话" >
                <Input />
              </Form.Item>
              <Form.Item name="name" label="姓名" >
                <Input />
              </Form.Item>
              <Form.Item name="entName" label="公司名" >
                <Input />
              </Form.Item>
              <Form.Item name="word" label="所在行业" >
                <Input />
              </Form.Item>
              <Form.Item name="desc" label="需求简述" >
                <Input />
              </Form.Item>


              <Button type="primary" htmlType="submit" className='sub-btn'>
                提交
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  </div >
};

export default Enterprise;
