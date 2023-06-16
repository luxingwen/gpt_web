import { Space } from 'antd';

interface RadioGroupProps {
  value?: string;
  onChange?: (value: string) => void;
  options: {
    label: string;
    value: string;
    [key: string]: any;
  }[];
  renderItem?: (item: {
    label: string;
    value: string;
    [key: string]: any;
  }) => React.ReactNode;
}
function RadioGroup(props: RadioGroupProps) {
  const { value, onChange, options, renderItem } = props;
  return (
    <Space>
      {options.map((item) => {
        return (
          <div
            key={item.value}
            className={`flex items-center justify-center rounded-md cursor-pointer p-1 ${
              value === item.value
                ? 'border-2 border-[rgba(75,_100,_243,_1)]'
                : 'border-2 border-gray-200'
            }`}
            onClick={() => {
              onChange?.(item.value);
            }}
          >
            {renderItem ? renderItem(item) : item.label}
          </div>
        );
      })}
    </Space>
  );
}

export default RadioGroup;
