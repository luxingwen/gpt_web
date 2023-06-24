import { CheckCircleFilled } from '@ant-design/icons';
import { PageContainer, ProList } from '@ant-design/pro-components';
import { Button, Image, Progress, Space, message } from 'antd';
import { Link } from '@umijs/max';
import { useState, useEffect } from 'react';
import { aiDrawImages, delAiDrawImages } from '@/service/ai-paint';

import { formatTimestamp } from '@/utils/utils';


function PictureFolder() {
  const [checked, setChecked] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[]>([]);
  const [isAll, setIsAll] = useState<boolean>(false);
  const [picTotal, setPicTotal] = useState<number>(10);
  const [picUsed, setPicUsed] = useState<number>(0);
  const [picList, setPicList] = useState<any[]>([]);


  useEffect(() => {
    aiDrawImages({}).then((res) => {
      console.log("aiDrawImages:", res);
      if (res.errno === 0) {
        setPicTotal(res.total);
        setPicUsed(res.used);
        const newList = res.data?.map((item) => {
          let status_txt = '';
          switch (item.status) {
            case 1:
              status_txt = '队列中...';
              break;
            case 2:
              status_txt = '生成中...';
              break;
            case 3:
              status_txt = '已完成';
              break;
            case 4:
              status_txt = '图片违规，无法查看';
              break;
          }
          item.status_txt = status_txt;
          if (item?.image_info && item.image_info.length > 0) {
            item.image_url = item.image_info[0];
          }
          return item;
        });

        setPicList(newList || []);
      } else {
        message.error(res.errmsg);
      }
    });
  }, []);


  const handleDeleteImage = () => {
    console.log("handleDeleteImage:", selectedRows);
    let ids = selectedRows.map((item) => item.id);
    if (ids.length === 0) {
      message.error('请选择要删除的图片');
      return;
    }
    delAiDrawImages({ ids }).then((res) => {
      console.log("delAiDrawImages:", res);
      if (res.errno === 0) {
        message.success('删除成功');
        setSelectedRows([]);
        setChecked(false);
        let newList = picList.filter((item) => !ids.includes(item.id));
        setPicList(newList);
      } else {
        message.error('删除失败');

      }
    });

  };

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
        headerTitle={
          <Space direction="vertical" className="w-52" size={0}>
            <Progress percent={picUsed / picTotal * 100} showInfo={false} className="m-0" />
            <span className="text-xs font-normal text-gray-500">{picUsed}/{picTotal}</span>
          </Space>
        }
        toolBarRender={() => [
          <Button key="1" type="primary" onClick={() => setChecked(!checked)}>
            {checked ? '取消' : '管理'}
          </Button>,
        ]}
        dataSource={picList}
        metas={{
          content: {
            render: (_, record) => {
              return (
                <div className="w-full">
                  {checked && (
                    <CheckCircleFilled
                      className={`absolute top-2 left-2 border rounded-full ${selectedRows.findIndex(
                        (item) => item.id === record.id,
                      ) > -1
                        ? ' text-primary'
                        : 'text-transparent'
                        }`}
                    />
                  )}
                  <Space direction="vertical" className="w-full">
                    {record.status == 3 && <Link to={`/ai-paint/text-to-image/drawinfo/${record.id}`}> <Image src={record.image_url} width="100%" preview={false} /> </Link>}
                    {record.status != 3 && <Link to={`/ai-paint/text-to-image/drawing/${record.id}`}><div className="w-full h-32 bg-gray-200">{record.status_txt}</div></Link>}
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
              if (!checked) return;
              setSelectedRows((prev) => {
                const index = prev.findIndex(
                  (item) => item.id === record.id,
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
              className={`border rounded-full ${isAll ? 'text-primary' : 'text-white '
                }`}
            />
            <span>全选</span>
          </Space>
          <span>已选择 {selectedRows.length} 张</span>
          <Button key="1" type="primary" onClick={handleDeleteImage} >
            删除
          </Button>
        </div>
      )}
    </PageContainer>
  );
}
export default PictureFolder;
