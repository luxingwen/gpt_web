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
function Drawing() {
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
        <ProDescriptions.Item label="作品名称">科技之城</ProDescriptions.Item>
        <ProDescriptions.Item label="描述">
          计的快手快脚打开啊啊是大手大脚深刻的就是将大手大脚的打击啊记得啊的
        </ProDescriptions.Item>
        <ProDescriptions.Item label="风格">二次元，动漫</ProDescriptions.Item>
        <ProDescriptions.Item label="模型">上课的军事基地</ProDescriptions.Item>
        <ProDescriptions.Item label="像素尺寸">1280*1280</ProDescriptions.Item>
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
