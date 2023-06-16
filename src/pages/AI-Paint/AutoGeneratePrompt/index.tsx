import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, Tabs, Tag } from 'antd';
import { useState } from 'react';

function AutoGeneratePrompt() {
  const [items] = useState([
    {
      key: '1',
      label: '背景描述',
    },
    {
      key: '2',
      label: '画面风格',
    },
    {
      key: '3',
      label: '画质描述',
    },
    {
      key: '4',
      label: '构图角度',
    },
    {
      key: '5',
      label: '游戏动漫',
    },
    {
      key: '6',
      label: '人物风格',
    },
  ]);
  return (
    <PageContainer title={false}>
      <Tabs
        defaultActiveKey="1"
        items={items}
        onChange={(activeKey) => {
          console.log(activeKey);
          // 根据 activeKey 去请求数据 并更新下面的列表
        }}
        className="text-lg"
      />
      <div className="min-h-[135px] p-4">
        <Space size={[0, 8]} wrap>
          {items.map((item) => (
            <Tag
              className="px-4 py-2 bg-[rgba(246,_246,_246,_1); text-[rgba(56,56,56,_1] text-xs border-none cursor-pointer"
              key={item.key}
              onClick={(e) => {
                e.preventDefault();
                // 点击标签之后，将标签添加到下面的列表中
              }}
            >
              {item.label}
            </Tag>
          ))}
        </Space>
      </div>

      <div className=" text-lg text-[rgba(52,_51,_91,_1)] mb-2">
        自动生成提示词
      </div>
      <div className="bg-[rgba(248,_250,_251,_1)] min-h-[135px] p-4">
        <Space size={[0, 8]} wrap>
          {items.map((item) => (
            <Tag
              className="px-2 py-1 bg-[rgba(234,_237,_240,_1); text-[rgba(56,56,56,_1] text-base border-none cursor-pointer"
              key={item.key}
              closable
              onClose={(e) => {
                e.preventDefault();
                // 移除已经选中的标签
              }}
            >
              {item.label}
            </Tag>
          ))}
        </Space>
      </div>
      <Button type="primary" className="bg-[rgba(75,_100,_243,_1)] mt-8">
        用提示词画图
      </Button>
    </PageContainer>
  );
}

export default AutoGeneratePrompt;
