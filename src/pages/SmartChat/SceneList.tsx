import React, { useState, useEffect } from 'react';
import { Input, Space, Row, Col, Pagination } from 'antd';
import SceneItemCard from './SceneItemCard';
import { SearchOutlined } from '@ant-design/icons';
import SearchBox from '@/components/SearchBox';
import { getSmartSceneList } from '@/service/smart_chat';

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
      page: 1,
      pageSize: 10,
    } as ReqSmartSceneParams);
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [sceneList, setSceneList] = useState([]);

  const fetchData = (params) => {
    getSmartSceneList(params)
      .then((res) => {
        console.log('res:', res);
        setSceneList(res.list);
        // 计算总页数
        // const totalPages = Math.ceil(res.total / reqSmartSceneParams.pageSize);
        // console.log('totalPages:', totalPages);
        setTotal(res.total);
      })
      .catch((err) => {});
  };

  useEffect(() => {
    fetchData({
      ...reqSmartSceneParams,
      page: currentPage,
    });
  }, [currentPage]);

  const handleSearch = (value) => {
    console.log('value:', value);
    setSearchValue(value);
    // 执行搜索逻辑...
    let reqSmartSceneParamsTemp = {
      ...reqSmartSceneParams,
      name: value,
      page: 1,
    };
    setReqSmartSceneParams(reqSmartSceneParamsTemp);
    setCurrentPage(1);
    fetchData(reqSmartSceneParamsTemp);
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

          <div style={{ marginTop: '12px', textAlign: 'center' }}>
            <Pagination
              current={currentPage}
              total={total}
              pageSize={reqSmartSceneParams.pageSize}
              onChange={(page) => setCurrentPage(page)}
              showSizeChanger={false}
            />
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SceneListPage;
