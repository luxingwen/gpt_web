/*
 * @Author: Draco draco.coder@gmail.com
 * @Date: 2023-06-16 18:51:08
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-06-17 15:00:58
 * @FilePath: /gpt_web/src/pages/AI-Paint/Drawing/index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { PageContainer, ProDescriptions } from '@ant-design/pro-components';
import { Button, Image, Progress, Space, Modal, Input, message } from 'antd';
import { useParams } from 'react-router-dom';
import { aiDrawImages, aiDrawProcess } from '@/service/ai-paint';
import { useEffect, useState } from 'react';
import { Link } from '@umijs/max';
import { saveSdImage } from '@/service/ai-paint';

function Drawing() {

  const { id } = useParams<{ id: string }>();

  const [aiImageInfo, setAiImageInfo] = useState({});

  const [aiDrawProcessInfo, setAiDrawProcessInfo] = useState({});

  const [showImage, setShowImage] = useState(0)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState('');




  useEffect(() => {
    let timer;
    const fetchData = async () => {
      const response = await aiDrawImages({ id });
      console.log('aiDrawImages:', response);
      if (response.errno === 0 && response.data && response.data.length > 0) {
        setAiImageInfo(response.data[0]);

        if (response.data[0].status === 1 || response.data[0].status === 2) {
          timer = setInterval(async () => {
            const processResponse = await aiDrawProcess({ task_id: id });
            console.log('aiDrawProcess:', processResponse);
            if (processResponse.errno === 0 && processResponse.data) {
              setAiDrawProcessInfo(processResponse.data);
            }
            if (processResponse.data.status === 3 || processResponse.data.status === 4) {
              clearInterval(timer);
              fetchData();
            }
          }, 1000);
        }
      }
    };
    fetchData();
    return () => clearInterval(timer);
  }, []);

  const changeImage = (idx: number) => {
    setShowImage(idx)
  }


  const handleSaveImage = () => {
    window.open(aiImageInfo.image_info[0]);
  };


  const handleShowModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleSubmit = () => {
    // 在此处处理提交逻辑，例如将标题发送到后端或执行其他操作
    console.log('提交作品标题:', title);
    if (title === '') {
      message.error('请输入作品标题');
      return;
    }


    saveSdImage({ id: parseInt(id), title: title }).then((res) => {
      if (res.errno === 0) {
        message.success('展出成功');
        setIsModalVisible(false);
      } else {
        message.error('失败');
      }
    });


  };

  return (
    <PageContainer title={false}>
      <ProDescriptions column={1}>
        {aiImageInfo && aiImageInfo?.image_info && aiImageInfo?.image_info.length > 0 &&
          <ProDescriptions.Item>
            <div className="relative w-52 overflow-hidden">
              <Image
                width="100%"
                height="100%"
                src={aiImageInfo.image_info[showImage]}
              />
            </div>
          </ProDescriptions.Item>}
        {aiImageInfo && aiImageInfo?.status === 4 &&
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
                图片违规，无法查看
              </div>
            </div>
          </ProDescriptions.Item>}
        {aiImageInfo && aiImageInfo?.status != 3 && aiDrawProcessInfo && aiDrawProcessInfo?.data &&
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
                  percent={parseInt(aiDrawProcessInfo.data.progress.toFixed(2) * 100, 10)}
                  strokeColor="#fff"
                  format={(percent) => {
                    return <span className="text-white">{percent}%</span>;
                  }}
                />
                <span className="text-white mt-2"></span>
              </div>
            </div>
          </ProDescriptions.Item>}
        {aiImageInfo && (aiImageInfo?.status === 1 || aiImageInfo?.status === 2) && <ProDescriptions.Item>
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
        </ProDescriptions.Item>}
        {aiImageInfo && aiImageInfo?.image_info && aiImageInfo?.image_info.length > 1 &&
          <ProDescriptions.Item>
            <Space direction="vertical">
              <span className="ant-descriptions-item-label after:hidden">
                图片 ({aiImageInfo?.image_info.length})
              </span>
              <Space>
                {aiImageInfo?.image_info.map((item, index) => {
                  return (
                    <div key={index} className="relative w-16 h-16 hover:cursor-pointer overflow-hidden" onClick={() => changeImage(index)}>
                      <Image
                        width="100%"
                        height="100%"
                        src={item}
                        preview={false}
                      />
                    </div>
                  );
                })
                }

              </Space>
            </Space>
          </ProDescriptions.Item>}
        <ProDescriptions.Item label="作品名称">{aiImageInfo?.title}</ProDescriptions.Item>
        <ProDescriptions.Item label="描述">
          {aiImageInfo?.prompt?.join(',')}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="风格">{aiImageInfo?.model_name}</ProDescriptions.Item>
        <ProDescriptions.Item label="模型">{aiImageInfo?.model}</ProDescriptions.Item>
        <ProDescriptions.Item label="像素尺寸">{aiImageInfo?.width}*{aiImageInfo?.height}</ProDescriptions.Item>
      </ProDescriptions>
      <Space>
        <Link to='/ai-paint/text-to-image'><Button>再画一次</Button></Link>
        {
          aiImageInfo?.status === 3 &&
          <>
            <Button onClick={
              handleSaveImage
            }>保存图片</Button>
            <Button type="primary" className="text-primary bg-secondary">
              分享
            </Button>
            <Button type="primary" onClick={handleShowModal}>展出作品</Button>
          </>
        }
      </Space>

      <Modal
        title="输入作品标题"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            提交
          </Button>,
        ]}
      >
        <Input
          placeholder="请输入作品标题"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Modal>
    </PageContainer >
  );
}

export default Drawing;
