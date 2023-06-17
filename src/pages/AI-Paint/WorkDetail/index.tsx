/*
 * @Author: Draco draco.coder@gmail.com
 * @Date: 2023-06-16 18:51:08
 * @LastEditors: Draco draco.coder@gmail.com
 * @LastEditTime: 2023-06-17 12:44:27
 * @FilePath: /gpt_web/src/pages/AI-Paint/Drawing/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { HeartOutlined, UserOutlined } from '@ant-design/icons';
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { Avatar, Button, Image, Space } from 'antd';
function Drawing() {
  return (
    <PageContainer title={false}>
      <ProDescriptions column={1}>
        <ProDescriptions.Item>
          <Space direction="vertical">
            <div className="relative w-72 h-72 overflow-hidden">
              <Image
                width="100%"
                height="100%"
                src={`https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png`}
              />
            </div>
            <div className="w-72 flex justify-between items-center">
              <Space>
                <Avatar icon={<UserOutlined />}></Avatar>
                User
              </Space>
              <Space>
                <HeartOutlined className="text-2xl" />
                12
              </Space>
            </div>
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
        <ProDescriptions.Item label="作品名称">科技之城</ProDescriptions.Item>
        <ProDescriptions.Item label="描述">
          计的快手快脚打开啊啊是大手大脚深刻的就是将大手大脚的打击啊记得啊的
        </ProDescriptions.Item>
        <ProDescriptions.Item label="风格">二次元，动漫</ProDescriptions.Item>
        <ProDescriptions.Item label="模型">上课的军事基地</ProDescriptions.Item>
        <ProDescriptions.Item label="像素尺寸">1280*1280</ProDescriptions.Item>
      </ProDescriptions>
      <Space className=" mt-16">
        <Button
          type="primary"
          className=" bg-[rgba(220,_224,_251,_1)] text-[rgba(80,_99,_234,_1)]"
        >
          分享
        </Button>
        <Button type="primary" className=" bg-[rgba(75,_100,_243,_1)]">
          画同款
        </Button>
      </Space>
    </PageContainer>
  );
}

export default Drawing;
