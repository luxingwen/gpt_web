import React, { useState, useEffect } from 'react';
import { Input, Space, Row, Col } from 'antd';
import SceneItemCard from './SceneItemCard';
import { SearchOutlined } from '@ant-design/icons';
import SearchBox from '@/components/SearchBox';
import { getSmartSceneList } from '@/service/smart_chat';
import { getUserList } from '@/service/user';

import './SceneList.less';

const { Search } = Input;

type ReqSmartSceneParams = {
  name: string;
  page: number;
  pageSize: number;
};

const SceneListPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const [reqSmartSceneParams, setReqSmartSceneParams] =
    useState<ReqSmartSceneParams>({
      page: 0,
      pageSize: 10,
    } as ReqSmartSceneParams);

  const [sceneList, setSceneList] = useState([]);

  useEffect(() => {
    getSmartSceneList(reqSmartSceneParams)
      .then((res) => {
        console.log('res:', res);

        setSceneList(res.list);
      })
      .catch((err) => {});
  }, []);

  const handleSearch = (value) => {
    setSearchValue(value);
    // 执行搜索逻辑...
  };

  return (
    <Row justify="center">
      <Col xs={{ span: 24 }} lg={{ span: 14 }}>
        <div style={{ padding: '16px' }}>
          <SearchBox onSearch={handleSearch} />

          <div style={{ marginTop: '12px' }}>
            {/* SceneItemCard 列表 */}

            {sceneList.map((item, index) => (
              <SceneItemCard
                title={item.scene_name}
                createTime={item.create_time}
                key={index}
              />
            ))}
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SceneListPage;
