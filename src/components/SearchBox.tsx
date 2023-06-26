import { SearchOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useState } from 'react';
import './SearchBox.less';

const SearchBox = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchValue);
    }
  };

  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="w-full flex items-center justify-center my-4">
      <Input
        className="w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        placeholder="搜索场景"
        prefix={<SearchOutlined className="text-gray-400" />}
        onKeyPress={handleKeyPress}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
