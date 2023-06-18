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
import { Link, useLocation } from '@umijs/max';
import { Button, Collapse } from 'antd';
import { useEffect, useRef, useState } from 'react';
import RadioGroup from '../components/RadioGroup';

import { getAiDrawModels } from '@/service/ai-paint';

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

  const { state } = useLocation();
  console.log('state:', state);

  useEffect(() => {
    getAiDrawModels({}).then((res) => {
      console.log('getAiDrawModels:', res);
      if (res.errno === 0) {
        let modellist = [];
        res.data.forEach((item) => {
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
                开始生成 ｜ 消耗画贝 12.2
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          console.log("finish:",values);
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
                  <img src={item?.image} className="w-20 h-20" />
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
            <ProFormItem noStyle>
              {formRef.current?.getFieldFormatValue?.('batch_size') || 1}
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
                    <ProFormSlider noStyle name="batchCount" min={1} />
                    <ProFormItem noStyle>
                      {formRef.current?.getFieldFormatValue?.('batchCount') ||
                        1}
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
                    <ProFormItem noStyle>
                      {formRef.current?.getFieldFormatValue?.('cfg_scale') || 1}
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
                    <ProFormItem noStyle>
                      {formRef.current?.getFieldFormatValue?.('denoising_strength') || 1}
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
