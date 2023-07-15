import {
  PageContainer,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormInstance,
  ProFormItem,
  ProFormSlider,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Link, history, useLocation } from '@umijs/max';
import { Button, Collapse } from 'antd';
import { useEffect, useRef, useState } from 'react';
import RadioGroup from '../components/RadioGroup';

import { aiDrawTextToImage, getAiDrawModels } from '@/service/ai-paint';

import './index.less';

const sizeList = [
  {
    label: '1:1',
    value: '1:1',
    classSuffix: '11',
  },
  {
    label: '3:4',
    value: '3:4',
    classSuffix: '34',
  },
  {
    label: '4:3',
    value: '4:3',
    classSuffix: '43',
  },
  {
    label: '9:16',
    value: '9:16',
    classSuffix: '916',
  },
  {
    label: '16:9',
    value: '16:9',
    classSuffix: '169',
  },
];

export default function TextToImage() {
  const formRef = useRef<ProFormInstance>();
  const [models, setModels] = useState([]);

  const [defaultCost, setDefaultCost] = useState<number>(0)

  const { state } = useLocation();

  useEffect(() => {
    if (state?.selectedTagList) {
      console.log('selectedTagList:', state?.selectedTagList);
      const promptList = state?.selectedTagList.map((item) => item.words);
      console.log('promptList:', promptList);
      formRef.current?.setFieldsValue({
        prompt: promptList.join(','),
      });
    }
  }, [state?.selectedTagList]);


  useEffect(() => {

    if (state?.aiImageInfo) {
      // 给表单设置初始变量
      console.log('state?.aiImageInfo:', state?.aiImageInfo);
      formRef.current?.setFieldsValue({
        prompt: state?.aiImageInfo?.prompt.join(","),
        negative_prompt: state?.aiImageInfo?.negative_prompt.join(","),
        cfg_scale: state?.aiImageInfo?.cfg_scale,
        denoising_strength: state?.aiImageInfo?.denoising_strength,
        steps: state?.aiImageInfo?.steps,
        seed: state?.aiImageInfo?.seed,
      });

      models?.forEach((item) => {
        if (item.value === state?.aiImageInfo?.model) {
          formRef.current?.setFieldsValue({
            model: item.value,
          });
        }
      })

      const width = state?.aiImageInfo?.width;
      const height = state?.aiImageInfo?.height;

      let sizeVal = '';
      let qualityVal = '普通';
      if (width === 512 && height == 512) {
        sizeVal = '1:1'

      }

      if (width === 512 && height == 910) {
        sizeVal = '9:16'
      }

      if (height === 910 && height === 512) {
        sizeVal = '16:9'
      }

      if (width === 512 && height == 682) {
        sizeVal = '3:4'
      }

      if (width === 682 && height === 512) {
        sizeVal = '4:3'
      }


      if (width === 512 * 2 && height == 512 * 2) {
        sizeVal = '1:1'
        qualityVal = '高清'
      }

      if (width === 512 * 2 && height == 910 * 2) {
        sizeVal = '9:16'
        qualityVal = '高清'
      }

      if (height === 910 * 2 && height === 512 * 2) {
        sizeVal = '16:9'
        qualityVal = '高清'
      }

      if (width === 512 * 2 && height == 682 * 2) {
        sizeVal = '3:4'
        qualityVal = '高清'
      }

      if (width === 682 * 2 && height === 512 * 2) {
        sizeVal = '4:3'
        qualityVal = '高清'
      }


      formRef.current?.setFieldsValue({
        rate: sizeVal,
        quality: qualityVal,
      });


    }

  }, [state?.aiImageInfo, models]);

  useEffect(() => {
    getAiDrawModels({}).then((res) => {
      console.log('getAiDrawModels:', res);
      if (res.errno === 0) {
        let modellist = [];
        res?.data?.forEach((item) => {
          modellist.push({
            label: item.model_name,
            image: item.img,
            value: item.model,
          });
        });
        setModels(modellist);
      }
    });
  }, []);


  const onChange = () => {
    const bs = formRef.current?.getFieldValue('batch_size') ? formRef.current?.getFieldValue('batch_size') : 1
    const r = formRef.current?.getFieldValue('rate')
    const q = formRef.current?.getFieldValue('quality')
    if (!(bs && r && q)) {
      return
    }

    let cost = 0
    if (q == '普通') {
      switch (r) {
        case '1:1':
          cost = 1.5 * bs
          break
        case '3:4':
          cost = 1.8 * bs
          break;
        case '4:3':
          cost = 1.8 * bs
          break;
        case '16:9':
          cost = 2 * bs
          break
        case '9:16':
          cost = 2 * bs
          break
      }
    } else {
      switch (r) {
        case '1:1':
          cost = 2.9 * bs
          break
        case '3:4':
          cost = 3 * bs
          break;
        case '4:3':
          cost = 3 * bs
          break;
        case '16:9':
          cost = 4.5 * bs
          break
        case '9:16':
          cost = 4.5 * bs
          break
      }
    }

    setDefaultCost(cost)
  }

  const handleSubmit = (values: any) => {
    console.log('handleSubmit:', values);
    values.prompt = values.prompt?.split(',');
    values.negative_prompt = values.negative_prompt?.split(',');

    aiDrawTextToImage(values).then((res) => {
      console.log('aiDrawTextToImage:', res);
      if (res.errno === 0) {
        // setModels(modellist);
        history.push({
          pathname: '/ai-paint/text-to-image/drawing/' + res.data.id,
        });
      }
    });
  };

  return (
    <PageContainer title={false}>
      <ProForm<API.SDTextToImageParam>
        submitter={{
          render: (props) => {
            console.log(props);
            return [
              <Button
                type="primary"
                key="submit"
                onClick={() => props.form?.submit?.()}
              >
                开始生成 ｜ 消耗画贝 {defaultCost}
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          console.log('finish:', values);
          handleSubmit(values);
          // 这里做提交之后的事情
        }}
        layout="vertical"
        formRef={formRef}
        labelCol={{
          span: 10,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          batchSize: 1, // 设置 batchSize 的初始值
        }}
      >
        <ProFormItem>
          <div className="flex justify-between place-items-end pb-2">
            <label>提示词</label>
            <Link to="auto-generate-prompt">
              <span className="p-2 text-xs bg-secondary">自动生成提示词</span>
            </Link>
          </div>
          <ProFormTextArea
            noStyle
            name="prompt"
            placeholder="请输入提示词，多个词用逗号分隔"
            fieldProps={{
              maxLength: 800,
              showCount: true,
              autoSize: {
                minRows: 3,
              },
            }}
          />
        </ProFormItem>
        <ProForm.Item name="model" label="模型">
          <RadioGroup
            options={models}
            renderItem={(item) => {
              return (
                <div className="flex flex-col items-center relative">
                  <div className="w-20 h-20 overflow-hidden">
                    <img src={item?.image} className="w-full h-full object-cover" />
                  </div>
                  <span className=" w-full bg-black/50 text-xs text-white text-center absolute bottom-0">
                    {item.label}
                  </span>
                </div>
              );
            }}
          />
        </ProForm.Item>

        <ProFormTextArea
          name="negative_prompt"
          label="反向描述（选填）"
          placeholder="请输入不希望出现的词，多个词用逗号分隔"
          fieldProps={{
            maxLength: 800,
            showCount: true,
            autoSize: {
              minRows: 3,
            },
          }}
        />

        <ProForm.Item name="rate" label="尺寸和像素">
          <RadioGroup
            onChange={onChange}
            options={sizeList}
            renderItem={(item) => {
              return (
                <div className="flex flex-col items-center relative">
                  {/* <img src={item?.image} className="w-20 h-20" /> */}
                  <div className={'size-item-icon' + item.classSuffix}></div>
                  <span className=" w-full bg-black/50 text-xs text-white text-center absolute bottom-0">
                    {item.label}
                  </span>
                </div>
              );
            }}
          />
        </ProForm.Item>

        <ProForm.Item name="quality" label="质量">
          <RadioGroup
            onChange={onChange}
            options={[
              {
                label: '普通',
                value: '普通',
              },
              {
                label: '高清',
                value: '高清',
              },
            ]}
            renderItem={(item) => {
              return (
                <div className=" flex justify-center items-center w-16 h-16 bg-secondary">
                  <span className=" text-lg text-primary">{item.label}</span>
                </div>
              );
            }}
          />
        </ProForm.Item>

        <ProForm.Item>
          <label>数量</label>
          <ProForm.Group>
            <ProFormSlider noStyle name="batch_size" min={1} max={3} />
            <ProFormItem noStyle shouldUpdate>
              {({ getFieldValue }) => {
                onChange()
                return getFieldValue('batch_size') || 1
              }}
            </ProFormItem>
          </ProForm.Group>
        </ProForm.Item>
        <ProForm.Item>
          <Collapse ghost>
            <Collapse.Panel header="高级设置" key="1">
              <div className=" border border-gray-300 rounded-md p-4 -m-3">
                <ProForm.Item>
                  <label>迭代次数</label>
                  <ProForm.Group>
                    <ProFormSlider noStyle name="steps" min={1} />
                    <ProFormItem noStyle shouldUpdate>
                      {({ getFieldValue }) => getFieldValue('steps') || 1}
                    </ProFormItem>
                  </ProForm.Group>
                </ProForm.Item>
                <ProFormDigit
                  label="种子"
                  name="seed"
                  width="sm"
                  min={-999}
                  max={999}
                />
                <ProForm.Item>
                  <label>提示词相关性</label>
                  <ProForm.Group>
                    <ProFormSlider noStyle name="cfg_scale" min={1} max={3} />
                    <ProFormItem noStyle shouldUpdate>
                      {({ getFieldValue }) => getFieldValue('cfg_scale') || 1}
                    </ProFormItem>
                  </ProForm.Group>
                </ProForm.Item>
                <ProFormCheckbox name="restore_faces">
                  真人五官优化
                </ProFormCheckbox>
                <ProFormCheckbox name="tiling">可平铺</ProFormCheckbox>
                <ProForm.Item>
                  <label>重绘幅度</label>
                  <ProForm.Group>
                    <ProFormSlider noStyle name="denoising_strength" min={1} />
                    <ProFormItem noStyle shouldUpdate>
                      {({ getFieldValue }) =>
                        getFieldValue('denoising_strength') || 1
                      }
                    </ProFormItem>
                  </ProForm.Group>
                </ProForm.Item>
              </div>
            </Collapse.Panel>
          </Collapse>
        </ProForm.Item>
      </ProForm>
    </PageContainer>
  );
}
