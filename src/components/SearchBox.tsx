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
    <div className="custom-search">
      <Input
        className="custom-input"
        placeholder="搜索场景"
        prefix={<SearchOutlined />}
        onKeyPress={handleKeyPress}
        value={searchValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBox;
