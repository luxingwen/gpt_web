import { ProList } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Image, Progress, Space, Tabs } from 'antd';
import { getImageLikeList, getImageShowsList } from '@/service/ai-paint';
import { useEffect, useState } from 'react';
import { formatTimestamp } from '@/utils/utils';



function MyWorks() {

  const [queryPage, setQueryPage] = useState<API.ReqPageType>({
    page: 0,
    per_page: 10,
  });

  const [picLikesList, setPicLikesList] = useState<any[]>([]);

  const [picShowsList, setPicShowsList] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getImageShowsList(queryPage).then((res) => {
      if (res.errno === 0) {
        console.log("getImageShowsList:", res.data);
        setPicShowsList(res?.data?.list || []);
      } else {
        console.log("getImageShowsList:", res.errmsg);
      }
    });
    getImageLikeList(queryPage).then((res) => {
      if (res.errno === 0) {
        setPicLikesList(res?.data?.list || []);
        setData(res?.data?.list || [])
      }
      console.log("getImageLikeList:", res);

    });
  }, []);

  return (
    <PageContainer title={false}>
      <Tabs
        defaultActiveKey="2"
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
          console.log("activeKey:", activeKey);

          if (activeKey === '1') {

            console.log("11111")
            setData(picShowsList)
          } else {
            console.log("222222")
            setData(picLikesList)
          }


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
                    <Image src={record.image_info[0]} width="100%" preview={false} />
                    <span className="text-center">{record.title}</span>
                    <span className="text-center text-xs text-gray-500">
                      {formatTimestamp(record.create_time)}
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
