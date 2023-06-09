import { ProList } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Image, Progress, Space } from 'antd';
import { getHotAiDraws } from '@/service/ai-paint';
import { useEffect, useState } from 'react';
import { formatTimestamp } from '@/utils/utils';
import { Link } from '@umijs/max';

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

function FeaturedWorks() {

  const [picList, setPicList] = useState<any[]>([]);

  useEffect(() => {
    getHotAiDraws().then((res) => {
      console.log("getHotAiDraws:", res);
      if (res.errno === 0) {
        setPicList(res.data || []);
      }
    });
  }, []);

  return (
    <PageContainer title={false}>
      <ProList<any>
        pagination={{
          defaultPageSize: 12,
          showSizeChanger: false,
        }}
        showActions="hover"
        rowSelection={{}}
        grid={{ gutter: 16, column: 6 }}
        dataSource={picList}
        metas={{
          content: {
            render: (_, record) => {
              return (
                <div className="w-full">
                  <Link to={`/ai-paint/work-detail/${record.id}`}>
                    <Space direction="vertical" className="w-full">
                      <Image src={record.image_info[0]} width="100%" preview={false} />
                      <span className="text-center">{record.title}</span>
                      <span className="text-center text-xs text-gray-500">
                        {formatTimestamp(record.create_time)}
                      </span>
                    </Space>
                  </Link>
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
export default FeaturedWorks;
