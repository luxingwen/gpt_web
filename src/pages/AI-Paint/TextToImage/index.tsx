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
import { Link } from '@umijs/max';
import { Button, Collapse } from 'antd';
import { useRef } from 'react';
import RadioGroup from '../components/RadioGroup';

export default function TextToImage() {
  const formRef = useRef<ProFormInstance>();
  return (
    <PageContainer title={false}>
      <ProForm<API.SDTextToImageParam>
        submitter={{
          render: (props) => {
            console.log(props);
            return [
              <Button
                type="primary"
                className="bg-[rgba(75,_100,_243,_1)]"
                key="submit"
                onClick={() => props.form?.submit?.()}
              >
                开始生成 ｜ 消耗画贝 12.2
              </Button>,
            ];
          },
        }}
        onFinish={async (values) => {
          console.log(values);
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
      >
        <ProFormItem>
          <div className="flex justify-between place-items-end pb-2">
            <label>提示词</label>
            <Link
              to="auto-generate-prompt"
              className="w-24 py-2 text-xs flex justify-center bg-[rgba(220,_224,_251,_1)] text-[rgba(80,_99,_234,_1)]"
            >
              自动生成提示词
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
            options={[
              {
                label: '流光',
                image:
                  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                value: 'a',
              },
              {
                label: '二次元',
                image:
                  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                value: 'b',
              },
            ]}
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
          name="negativePrompt"
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

        <ProForm.Item name="filed-1" label="尺寸和像素">
          <RadioGroup
            options={[
              {
                label: '1:1',
                image:
                  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                value: 'a',
              },
              {
                label: '3:4',
                image:
                  'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                value: 'b',
              },
            ]}
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

        <ProForm.Item name="quality" label="质量">
          <RadioGroup
            options={[
              {
                label: '普通',
                value: 'a',
              },
              {
                label: '高清',
                value: 'b',
              },
            ]}
            renderItem={(item) => {
              return (
                <div className=" flex justify-center items-center w-16 h-16 bg-[rgba(220,_224,_251,_1)]">
                  <span className=" text-[20px] text-[rgba(80,_99,_234,_1)]">
                    {item.label}
                  </span>
                </div>
              );
            }}
          />
        </ProForm.Item>

        <ProForm.Item>
          <label>数量</label>
          <ProForm.Group>
            <ProFormSlider noStyle name="batchSize" min={1} />
            <ProFormItem noStyle>
              {formRef.current?.getFieldFormatValue?.('batchSize') || 1}
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
                  label="迭代次数"
                  name="steps"
                  width="sm"
                  min={1}
                  max={10}
                />
                <ProForm.Item>
                  <label>提示词相关性</label>
                  <ProForm.Group>
                    <ProFormSlider noStyle name="filed-2" min={1} />
                    <ProFormItem noStyle>
                      {formRef.current?.getFieldFormatValue?.('filed-2') || 1}
                    </ProFormItem>
                  </ProForm.Group>
                </ProForm.Item>
                <ProFormCheckbox name="restoreFaces">
                  真人五官优化
                </ProFormCheckbox>
                <ProFormCheckbox name="tiling">可平铺</ProFormCheckbox>
                <ProForm.Item>
                  <label>重绘幅度</label>
                  <ProForm.Group>
                    <ProFormSlider noStyle name="filed-3" min={1} />
                    <ProFormItem noStyle>
                      {formRef.current?.getFieldFormatValue?.('filed-3') || 1}
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
