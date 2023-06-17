import { CheckCircleFilled } from '@ant-design/icons';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Image, Progress, Space } from 'antd';
import { useState } from 'react';

const data = [
  '语雀的天空',
  'Ant Design',
  '蚂蚁金服体验科技',
  'TechUI',
  'TechUI 2.0',
  'Bigfish',
  'Umi',
  'Ant Design Pro',
].map((item) => ({
  title: item,
  subTitle: new Date().toLocaleDateString(),
  actions: [<a key="run">邀请</a>, <a key="delete">删除</a>],
  avatar:
    'https://gw.alipayobjects.com/zos/antfincdn/UCSiy1j6jx/xingzhuang.svg',
  content: (
    <div
      style={{
        flex: 1,
      }}
    >
      <div
        style={{
          width: 200,
        }}
      >
        <div>发布中</div>
        <Progress percent={80} />
      </div>
    </div>
  ),
}));

function PictureFolder() {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isAll, setIsAll] = useState<boolean>(false);
  return (
    <PageContainer title={false}>
      <ProList<any>
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 6 }}
        headerTitle={
          <Space direction="vertical" className="w-52" size={0}>
            <Progress percent={8} showInfo={false} className="m-0" />
            <span className="text-xs font-normal text-gray-500">8/100</span>
          </Space>
        }
        toolBarRender={() => [
          <Button
            key="1"
            className=" bg-[rgba(75,_100,_243,_1)]"
            type="primary"
            onClick={() => setChecked(!checked)}
          >
            {checked ? '取消' : '管理'}
          </Button>,
        ]}
        dataSource={data}
        metas={{
          content: {
            render: (_, record) => {
              return (
                <div className="w-full">
                  {checked && (
                    <CheckCircleFilled
                      className={` text-lg absolute top-2 left-2 ${
                        selectedRows.findIndex(
                          (item) => item.title === record.title,
                        ) > -1
                          ? 'text-[#4b64f3]'
                          : 'text-[#e5e5e5]'
                      }`}
                    />
                  )}
                  <Space direction="vertical" className="w-full">
                    <Image src={record.avatar} width="100%" preview={false} />
                    <span className="text-center">{record.title}</span>
                    <span className="text-center text-xs text-gray-500">
                      {record.subTitle}
                    </span>
                  </Space>
                </div>
              );
            },
          },
        }}
        onItem={(record: any) => {
          return {
            onMouseEnter: () => {
              console.log(record);
            },
            onClick: () => {
              if (!checked) return;
              setSelectedRows((prev) => {
                const index = prev.findIndex(
                  (item) => item.title === record.title,
                );
                if (index > -1) {
                  prev.splice(index, 1);
                  return [...prev];
                }
                return [...prev, record];
              });
            },
          };
        }}
      />
      {checked && (
        <div className="flex justify-between items-center mt-4">
          <Space
            onClick={() => {
              setIsAll(!isAll);
              setSelectedRows(isAll ? [] : data);
            }}
            size="small"
          >
            <CheckCircleFilled
              className={`border rounded-full ${
                isAll ? 'text-[#4b64f3]' : 'text-white '
              }`}
            />
            <span>全选</span>
          </Space>
          <span>已选择 2 张</span>
          <Button
            key="1"
            className=" bg-[rgba(75,_100,_243,_1)]"
            type="primary"
          >
            删除
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
export default PictureFolder;
