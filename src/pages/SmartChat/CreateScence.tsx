import React from 'react';
import { Form, Input, Radio, Upload, Button, Space, Card } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import './CreateScene.less';

const { Item } = Form;

const CreateScene = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
    // 执行创建场景逻辑...
  };

  return (
    <div style={{ marginTop: '22px' }}>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <Form layout="vertical" onFinish={onFinish}>
          <Item
            label="场景名称"
            name="sceneName"
            rules={[
              {
                required: true,
                message: '请输入场景名称',
              },
            ]}
          >
            <Input
              placeholder="请输入场景名称"
              style={{ height: '40px', borderRadius: '20px' }}
            />
          </Item>
          <Item
            label="上传的数据类型"
            name="dataType"
            rules={[
              {
                required: true,
                message: '请选择上传的数据类型',
              },
            ]}
          >
            <Radio.Group className="custom-radio-group">
              <Radio value="txt">TXT</Radio>
              <Radio value="pdf">PDF</Radio>
              <Radio value="excel">Excel</Radio>
              <Radio value="word">Word</Radio>
            </Radio.Group>
          </Item>
          <Item
            label=""
            name="upload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: '请上传文件',
              },
            ]}
          >
            <Card bordered={false} className="upload-card">
              <Upload multiple={false} beforeUpload={() => false}>
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Card>
          </Item>
          <Item>
            <Space>
              <Button htmlType="button">取消</Button>
              <Button type="primary" htmlType="submit">
                创建
              </Button>
            </Space>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateScene;
