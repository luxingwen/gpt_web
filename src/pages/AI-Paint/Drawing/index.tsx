/*
 * @Author: Draco draco.coder@gmail.com
 * @Date: 2023-06-16 18:51:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-17 15:00:58
 * @FilePath: /gpt_web/src/pages/AI-Paint/Drawing/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { Button, Image, Progress, Space } from 'antd';
import { useParams } from 'react-router-dom';
import {aiDrawImages,aiDrawProcess} from '@/service/ai-paint';
import { useEffect, useState } from 'react';

function Drawing() {

  const { id } = useParams<{ id: string }>();

  const [aiImageInfo, setAiImageInfo] = useState({});
  useEffect(() => {
    aiDrawImages({id}).then((res) => {
      console.log('aiDrawImages:', res);
      if(res.errno === 0 && res.data && res.data.length > 0){
        setAiImageInfo(res.data[0]);
      }
    });
  }, []);

  return (
    <PageContainer title={false}>
      <ProDescriptions column={1}>
        <ProDescriptions.Item>
          <div className="relative w-52 h-52 overflow-hidden">
            <Image
              width="100%"
              height="100%"
              src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
            />
          </div>
        </ProDescriptions.Item>
        <ProDescriptions.Item>
          <div className="relative w-52 h-52 overflow-hidden">
            <Image
              width="100%"
              height="100%"
              src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
              preview={false}
              className="blur-md"
            />
            <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center">
              <Progress
                size="small"
                type="circle"
                percent={75}
                strokeColor="#fff"
                format={(percent) => {
                  return <span className="text-white">{percent}%</span>;
                }}
              />
              <span className="text-white mt-2">剩余生成时间约为16秒</span>
            </div>
          </div>
        </ProDescriptions.Item>
        <ProDescriptions.Item>
          <Space direction="vertical">
            <span className="ant-descriptions-item-label after:hidden">
              图片 (2)
            </span>
            <Space>
              <div className="relative w-16 h-16 overflow-hidden">
                <Image
                  width="100%"
                  height="100%"
                  src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                  preview={false}
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/50">
                  <span className="text-white">生成中</span>
                </div>
              </div>
              <div className="relative w-16 h-16 overflow-hidden">
                <Image
                  width="100%"
                  height="100%"
                  src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                  preview={false}
                />
                <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center bg-black/50">
                  <span className="text-white">生成中</span>
                </div>
              </div>
            </Space>
          </Space>
        </ProDescriptions.Item>
        <ProDescriptions.Item>
          <Space direction="vertical">
            <span className="ant-descriptions-item-label after:hidden">
              图片 (2)
            </span>
            <Space>
              <div className="relative w-16 h-16 overflow-hidden">
                <Image
                  width="100%"
                  height="100%"
                  src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                />
              </div>
              <div className="relative w-16 h-16 overflow-hidden">
                <Image
                  width="100%"
                  height="100%"
                  src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
                />
              </div>
            </Space>
          </Space>
        </ProDescriptions.Item>
        <ProDescriptions.Item label="作品名称">{aiImageInfo?.title}</ProDescriptions.Item>
        <ProDescriptions.Item label="描述">
          {aiImageInfo?.prompt?.join(',')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="风格">{aiImageInfo?.model_name}</ProDescriptions.Item>
        <ProDescriptions.Item label="模型">{aiImageInfo?.model}</ProDescriptions.Item>
        <ProDescriptions.Item label="像素尺寸">{aiImageInfo?.width}*{aiImageInfo?.height}</ProDescriptions.Item>
      </ProDescriptions>
      <Space>
        <Button>再画一次</Button>
        <Button>保存图片</Button>
        <Button type="primary" className="text-primary bg-secondary">
          分享
        </Button>
        <Button type="primary">展出作品</Button>
      </Space>
    </PageContainer>
  );
}

export default Drawing;
