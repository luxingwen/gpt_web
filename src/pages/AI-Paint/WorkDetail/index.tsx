/*
 * @Author: Draco draco.coder@gmail.com
 * @Date: 2023-06-16 18:51:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-17 15:01:06
 * @FilePath: /gpt_web/src/pages/AI-Paint/Drawing/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { Avatar, Button, Image, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { hotAiDrawImage, sdImageLike } from '@/service/ai-paint';
import { Link } from '@umijs/max';

function Drawing() {

  const { id } = useParams<{ id: string }>();

  const [aiImageInfo, setAiImageInfo] = useState({});

  useEffect(() => {
    hotAiDrawImage({ id }).then((res) => {
      console.log('hotAiDrawImage:', res);
      if (res.errno === 0 && res.data && res.data.length > 0) {
        setAiImageInfo(res.data[0]);
      }
    });
  }, []);

  const imageSrc = () => {
    console.log('aiImageInfo:', aiImageInfo);
    console.log('aiImageInfo.image_info:', aiImageInfo?.image_info);
    if (Array.isArray(aiImageInfo?.image_info) && aiImageInfo.image_info.length > 0) {
      return aiImageInfo.image_info[0];
    }
    return 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
  }


  const handleLike = () => {
    sdImageLike({ resource_id: parseInt(id) }).then((res) => {
      console.log('sdImageLike:', res);
      if (res.errno === 0) {
        setAiImageInfo({
          ...aiImageInfo,
          like_count: aiImageInfo.like_count + 1
        });
      }
    });
  }

  return (
    <PageContainer title={false}>
      <ProDescriptions column={1}>
        <ProDescriptions.Item>
          <Space direction="vertical">
            <div className="relative w-72 h-72 overflow-hidden">
              <Image
                width="100%"
                height="100%"
                src={imageSrc()}
              />
            </div>
            <div className="w-72 flex justify-between items-center">
              <Space>
                <Avatar src={aiImageInfo.avatar}></Avatar>
                {aiImageInfo?.nickname}
              </Space>
              <Space>
                <HeartOutlined className="text-2xl" onClick={handleLike} />
                {aiImageInfo?.like_count}
              </Space>
            </div>
          </Space>
        </ProDescriptions.Item>
        {aiImageInfo.image_info && aiImageInfo.image_info.length > 1 &&
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
          </ProDescriptions.Item>}
        <ProDescriptions.Item label="作品名称">{aiImageInfo?.title}</ProDescriptions.Item>
        <ProDescriptions.Item label="描述">
          {aiImageInfo?.prompt?.join(',')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="风格">{aiImageInfo?.model_name}</ProDescriptions.Item>
        <ProDescriptions.Item label="模型">{aiImageInfo?.model}</ProDescriptions.Item>
        <ProDescriptions.Item label="像素尺寸">{aiImageInfo.width}*{aiImageInfo.height}</ProDescriptions.Item>
      </ProDescriptions>
      <Space className="mt-16">
        <Button type="primary" className="text-primary bg-secondary">
          分享
        </Button>
        <Link to={'/ai-paint/text-to-image'} ><Button type="primary">画同款</Button></Link>
      </Space>
    </PageContainer>
  );
}

export default Drawing;
