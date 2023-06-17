import { ProList } from "@ant-design/pro-components";
import { PageContainer } from "@ant-design/pro-layout";
import { Progress, Space, Image, Tabs } from "antd";

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

function MyWorks() {
  return (
    <PageContainer title={false}>
       <Tabs
        defaultActiveKey="1"
        items={[
          {
            key: '1',
            label: '展出 2',
          },
          {
            key: '2',
            label: '收藏 21',
          },
        ]}
        onChange={(activeKey) => {
          console.log(activeKey);
          // 根据 activeKey 去请求数据 并更新下面的列表
        }}
        className="text-lg"
      />
      <ProList<any>
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 6 }}
        dataSource={data}
        metas={{
          content: {
            render: (_, record) => {
              return (
                <div className="w-full">
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
              console.log(record);
            },
          };
        }}
      />
    </PageContainer>
  );
}
export default MyWorks;
