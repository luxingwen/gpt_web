import {
    DownOutlined,
    PlusOutlined,
    QuestionCircleOutlined,
    UpOutlined,
    UploadOutlined,
} from '@ant-design/icons';
import { Button, Card, Form, Input, Radio, Space, Upload, message } from 'antd';
import { useRef, useState, useEffect } from 'react';
import UserSelect from './UserSelect.tsx';
import { getSmartSceneInfo, updateSmartSceneInfo } from '@/service/smart-chat/index';
import { PageContainer } from '@ant-design/pro-components';
import { getUserList } from '@/service/user/index';
import { history } from '@umijs/max';

import './CreateScene.less';

const { Item } = Form;

const EditScene = ({ setViewContent, sceneId }) => {


    const [showUserSelect, setShowUserSelect] = useState(false);
    const [radioIcon, setRadioIcon] = useState(<DownOutlined />);
    const [selectedImage, setSelectedImage] = useState(null);
    const [fileType, setFileType] = useState();
    const [fileList, setFileList] = useState([]);
    const [imageFile, setImageFile] = useState(null);
    const [userList, setUserList] = useState([]);
    const [initUserList, setInitUserList] = useState([]);
    const [loading, setLoading] = useState(false); // 添加loading状态变量
    const [fileParams, setFileParams] = useState([]); // 文件上传参数
    const formRef = useRef();


    const uploadRef = useRef(null);


    useEffect(() => {
        // 获取用户列表

        getSmartSceneInfo({ id: sceneId }).then((res) => {
            console.log('res:', res);
            if (res.errno === 0) {
                const { data } = res;


                setSelectedImage(data.ai_avatar);
                const fileList = JSON.parse(data.params) || [];
                setFileParams(fileList);

                if (data.share_type === 'user' && data.share_users != "") {



                    let uids = JSON.parse(data.share_users);

                    getUserList({ ids: uids }).then((resUser) => {
                        console.log('resUser:', resUser);
                        if (resUser.errno === 0) {
                            setInitUserList(resUser.data);
                            resUser.data.forEach((item) => {
                                setUserList((prevUserList) => {
                                    return [...prevUserList, item.id];
                                }
                                );
                            });
                        }
                        setShowUserSelect(true);
                    });
                }

                formRef?.current?.setFieldsValue({
                    sceneName: data.scene_name,
                    smartName: data.ai_name,
                    shareType: data.share_type,
                    fileUpload: fileList,
                    imageUpload: data.ai_avatar,
                    dataType: 'pdf'
                });

            }
        });
    }, []);



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

    const handleRemoveFileParams = (index) => {
        setFileParams((prevFileParams) => {
            const updatedFileParams = [...prevFileParams];
            updatedFileParams.splice(index, 1);
            return updatedFileParams;
        }
        );
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

        formData.append('id', parseInt(sceneId));


        // 添加头像文件到 FormData
        if (selectedImage && imageFile) {
            formData.append('avatarFile', imageFile);
        } else {
            formData.append('avatar', selectedImage);
        }

        if (showUserSelect) {
            // 添加用户数据到 FormData
            formData.append('userList', JSON.stringify(userList));
        }


        if (fileParams.length == 0 && fileList.length == 0) {
            message.error('请上传文件！');
            setLoading(false); // 结束加载状态
            return;
        }

        // 添加文件数据到 FormData
        fileList.forEach((file) => {
            formData.append('files', file);
        });

        if (fileParams.length > 0) {
            formData.append('params', JSON.stringify(fileParams));
        }

        // 执行创建场景逻辑...
        try {
            const response = await updateSmartSceneInfo(formData);
            console.log('更新场景成功：', response);
            if (response.errno === 0) {
                message.success('更新场景成功！');
                setLoading(false); // 结束加载状态
                history.push('/smart-ai/scene-list');
            }

            // 处理响应
        } catch (error) {
            // 处理错误
        } finally {
            setLoading(false); // 结束加载状态
        }
    };

    return (
        // <PageContainer title={false} style={{ margin: 0 }}>
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
                        <div className="upload-card-user" onClick={handleUploadClick}>
                            <div className="image-container w-full h-full flex items-center justify-center">
                                {selectedImage ? (
                                    <img src={selectedImage} alt="Selected" className="uploaded-image object-cover w-full h-full" />
                                ) : (
                                    <Upload beforeUpload={() => false} showUploadList={false}>
                                        <div className="flex items-center justify-center w-full h-full">
                                            <PlusOutlined className="text-4xl" />
                                        </div>
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
                        </div>
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
                            defaultValue="pdf"
                        >
                            <Radio value="txt" disabled>TXT</Radio>
                            <Radio value="pdf">PDF</Radio>
                            <Radio value="excel" disabled>Excel</Radio>
                            <Radio value="word" disabled>Word</Radio>
                        </Radio.Group>
                    </Item>
                    <Item
                        label=""
                        name="fileUpload"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e && e.fileList}
                        rules={[
                            {
                                required: false,
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
                        {fileParams.length > 0 && (
                            <div className="file-list">
                                {fileParams.map((file, index) => (
                                    <div key={index} className="file-item">
                                        <span>{file.file_name}</span>
                                        <Button type="link" onClick={() => handleRemoveFileParams(index)}>
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
                    {showUserSelect && <UserSelect setUserList={setUserList} initSelectUsers={initUserList} />}
                    <Item style={{ marginTop: '20px' }}>
                        <Space>
                            <Button htmlType="button">取消</Button>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                更新
                            </Button>
                        </Space>
                    </Item>
                </Form>
            </div>
        </div>
        // </PageContainer>
    );
};

export default EditScene;
