import { createSmartScene } from '@/service/smart-chat/index';
import {
  DownOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
  UpOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { Button, Card, Form, Input, Radio, Space, Upload, message } from 'antd';
import { useRef, useState } from 'react';
import UserSelect from './UserSelect.tsx';


import './CreateScene.less';

const { Item } = Form;

const CreateScene = ({ setViewContent }) => {
  const [showUserSelect, setShowUserSelect] = useState(false);
  const [radioIcon, setRadioIcon] = useState(<DownOutlined />);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileType, setFileType] = useState('');
  const [fileList, setFileList] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false); // 添加loading状态变量
  const formRef = useRef();


  const uploadRef = useRef(null);

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const handleRemoveFile = (index) => {
    setFileList((prevFileList) => {
      const updatedFileList = [...prevFileList];
      updatedFileList.splice(index, 1);
      return updatedFileList;
    });

    let newFileList = [...fileList];
    newFileList.splice(index, 1);

    formRef?.current?.setFieldsValue({ fileUpload: newFileList });
  };

  const handleRadioChange = (e) => {
    if (e.target.value === 'user') {
      setShowUserSelect(true);
      setRadioIcon(<UpOutlined />);
    } else {
      setShowUserSelect(false);
      setRadioIcon(<DownOutlined />);
    }
  };

  const handleUploadClick = () => {
    const inputElement = document.getElementById('upload-input');
    if (inputElement) {
      inputElement.click();
    }
  };

  const handleImageFileChange = (e) => {
    const file = e.target.files[0];
    const fileSizeLimit = 1024 * 1024; // 1MB
    const allowedTypes = ['image/png', 'image/jpeg'];

    if (
      file &&
      file.size <= fileSizeLimit &&
      allowedTypes.includes(file.type)
    ) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImageFile(file);

      // 执行上传操作
      message.success('文件上传成功！');
      formRef.current.setFieldsValue({ imageUpload: [file] });
    } else {
      message.error('请上传不超过1MB的PNG或JPEG格式的图片！');
    }
  };

  const handleContentFileChange = (file) => {
    // 处理文件上传逻辑
    console.log('file:', file.name);
    const fileSizeLimit = 1024 * 1024; // 1MB
    if (file.size > fileSizeLimit) {
      message.error('文件大小超过1MB限制！');
      return;
    }


   let newFileList = [...fileList, file];

    if (newFileList.length > 10) {
      message.error('文件数量超过10个限制！');
      return;
    }
  
    formRef?.current?.setFieldsValue({ fileUpload: newFileList });

    setFileList(newFileList);
  };

  const onFinish = async (values) => {
    setLoading(true); // 开始加载状态
    console.log('Form values:', values);

    // 将表单数据转为 FormData
    const formData = new FormData();
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        const value = values[key];
        formData.append(key, value);
      }
    }

    // 添加头像文件到 FormData
    if (selectedImage && imageFile) {
      formData.append('avatar', imageFile);
    }

    if (showUserSelect) {
      // 添加用户数据到 FormData
      formData.append('userList', JSON.stringify(userList));
    }

    // 添加文件数据到 FormData
    fileList.forEach((file) => {
      formData.append('files', file);
    });

    // 执行创建场景逻辑...
    try {
      const response = await createSmartScene(formData);
      console.log('创建场景成功：', response);
      if (response.errno === 0) {
        message.success('创建场景成功！');
        setLoading(false); // 结束加载状态
        setViewContent('scene_list');
      }

      // 处理响应
    } catch (error) {
      // 处理错误
    } finally {
      setLoading(false); // 结束加载状态
    }
  };

  return (
    <div style={{ marginTop: '22px' }}>
      <div style={{ maxWidth: '500px', padding: '12px' }}>
        <Form
          ref={formRef}
         layout="vertical" onFinish={onFinish}>
          <Item
            label="场景名称"
            name="sceneName"
            rules={[
              {
                required: true,
                message: '请输入场景名称',
              },
            ]}
          >
            <Input
              placeholder="请输入场景名称"
              style={{ height: '40px', borderRadius: '20px' }}
            />
          </Item>
          <Item
            label="数字人昵称设置"
            name="smartName"
            rules={[
              {
                required: true,
                message: '请输入数字人昵称',
              },
            ]}
          >
            <Input
              placeholder="例：客服Jessie"
              style={{ height: '40px', borderRadius: '20px' }}
            />
          </Item>
          <Item
            label="数字人形象设置"
            name="imageUpload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: '请上传数字人头像',
              },
            ]}
          >
            <Card
              bordered={false}
              className="upload-card-user"
              onClick={handleUploadClick}
            >
              <div className="image-container">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="uploaded-image"
                  />
                ) : (
                  <Upload beforeUpload={() => false} showUploadList={false}>
                    <PlusOutlined />
                  </Upload>
                )}
              </div>
              <input
                type="file"
                accept=".png, .jpg, .jpeg"
                ref={uploadRef}
                style={{ display: 'none' }}
                onChange={handleImageFileChange}
              />
            </Card>
            <div style={{ marginTop: '10px' }}>
              <span>
                注：最多上传1个头像，支持格式png/jpg，头像大小不得超过1M。
                <a href="/price">升级套餐</a>
              </span>
            </div>
            <input
              id="upload-input"
              type="file"
              accept=".png, .jpg, .jpeg"
              style={{ display: 'none' }}
              onChange={handleImageFileChange}
            />
          </Item>
          <Item
            label="上传的数据类型"
            name="dataType"
            rules={[
              {
                required: true,
                message: '请选择上传的数据类型',
              },
            ]}
          >
            <Radio.Group
              className="custom-radio-group"
              onChange={handleFileTypeChange}
            >
              <Radio value="txt">TXT</Radio>
              <Radio value="pdf">PDF</Radio>
              <Radio value="excel">Excel</Radio>
              <Radio value="word">Word</Radio>
            </Radio.Group>
          </Item>
          <Item
            label=""
            name="fileUpload"
            valuePropName="fileList"
            getValueFromEvent={(e) => e && e.fileList}
            rules={[
              {
                required: true,
                message: '请上传文件',
              },
            ]}
          >
            {fileList.length > 0 && (
              <div className="file-list">
                {fileList.map((file, index) => (
                  <div key={index} className="file-item">
                    <span>{file.name}</span>
                    <Button type="link" onClick={() => handleRemoveFile(index)}>
                      删除
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <Card bordered={false} className="upload-card">
              <Upload
                multiple={false}
                beforeUpload={() => false}
                accept={
                  fileType === 'txt'
                    ? '.txt'
                    : fileType === 'pdf'
                    ? '.pdf'
                    : fileType === 'excel'
                    ? '.xls,.xlsx'
                    : fileType === 'word'
                    ? '.doc,.docx'
                    : ''
                }
                onChange={({ file }) => handleContentFileChange(file)}
                maxCount={10}
                itemRender={() => null}
              >
                <Button icon={<UploadOutlined />}>点击上传</Button>
              </Upload>
            </Card>

            <div style={{ marginTop: '10px' }}>
              <span>
                注：最多上传10个文件，每个文件大小不得超过1M。
                <a href="/price">升级套餐</a>
              </span>
            </div>
          </Item>

          <div style={{ marginTop: '20px' }}>
            <div>
              {' '}
              <span>分享权限设置</span> <QuestionCircleOutlined />
            </div>
          </div>

          <Item
            style={{ marginTop: '10px' }}
            label=""
            name="shareType"
            rules={[
              {
                required: true,
                message: '请选择选中类型',
              },
            ]}
          >
            <Radio.Group
              className="vertical-radio-group"
              onChange={handleRadioChange}
            >
              <Radio className="square-radio" value="all">
                互联网上任意知道链接人可以访问
              </Radio>
              <Radio className="square-radio" value="user">
                仅限有权限者访问 {radioIcon}
              </Radio>
            </Radio.Group>
          </Item>
          {showUserSelect && <UserSelect setUserList={setUserList} />}
          <Item style={{ marginTop: '20px' }}>
            <Space>
              <Button htmlType="button">取消</Button>
              <Button type="primary" htmlType="submit" loading={loading}>
                创建
              </Button>
            </Space>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateScene;
