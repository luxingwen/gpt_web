import { Button, Col, Input, Row, Tag, message } from 'antd';
import { useEffect, useState } from 'react';

import TipsCard from '@/components/TipsCard';
import { PageContainer } from '@ant-design/pro-layout';

import { getAllScenes } from '@/service/api';
import { NavLink } from 'react-router-dom';
import './index.less';

const TipsBagPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [allCardData, setAllCardData] = useState([]);
  const [hotCardData, setHotCardData] = useState([]);
  const [scenesByCategoryId, setScenesByCategoryId] = useState({});
  const [cardData, setCardData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (value) => {
    if (value.trim() === '') {
      message.info('请输入搜索内容');
      return;
    }

    let searchResultList = [];
    allCardData.forEach((item) => {
      if (item?.name.includes(value) || item?.title?.includes(value) || item.scene_desc?.includes(value)) {
        searchResultList.push(item);
      }
    });
    if (searchResultList.length === 0) {
      message.info('未找到相关内容');
    }
    setSearchResult(searchResultList);
  };

  useEffect(() => {
    setIsLoading(true)
    getAllScenes().then((res) => {
      setAllCardData(res.data.all_scenes);
      let categorySenes = {};
      res.data.all_scenes.forEach((scene) => {
        const categoryId = scene.cat_id;
        if (categorySenes[categoryId]) {
          categorySenes[categoryId].push(scene);
        } else {
          categorySenes[categoryId] = [scene];
        }
      });
      setScenesByCategoryId(categorySenes);
      setCategoryList(res.data.categories);
      setHotCardData(res.data.hot_scenes);
      setCardData(res.data.all_scenes);
      setIsLoading(false)
    }).catch(_ => setIsLoading(false));
  }, []);

  const handleTagClick = (tag, cid) => {
    setSelectedTag(tag);
    if (cid) {
      setCardData(scenesByCategoryId[cid] ? scenesByCategoryId[cid] : []);
    } else {
      if (tag == '全部') {
        setCardData(allCardData);
      } else {
        setCardData(hotCardData);
      }
    }
  };

  const handleCleanClick = () => {
    setSearchResult([]);
    setSearchValue('');
  };

  return (
    <PageContainer title={false}>
      <Input.Search
        placeholder="输入关键词进行搜索"
        style={{ marginTop: '22px', borderRadius: '20px' }} // 根据需要调整搜索框的样式
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onSearch={handleSearch}
        enterButton // 添加此属性将使得输入框有一个额外的搜索按钮
      />

      {searchResult.length > 0 ? (
        <div style={{ marginTop: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h2 style={{ marginRight: '18px', textAlign: 'center' }}>
              搜索结果
            </h2>
            <Button onClick={handleCleanClick}>清空</Button>
          </div>

          <div style={{ marginTop: '24px' }}>
            <Row gutter={[16, 16]}>
              {searchResult.map((card, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                  <NavLink to={`/ai/prompt/${card.id}`}>
                    <TipsCard
                      title={card.name}
                      description={card.scene_desc}
                      style={{ height: '120px' }}
                    />
                  </NavLink>
                </Col>
              ))}
              {/* 其他 TipsCard 组件... */}
            </Row>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginTop: '24px' }}>
            <Tag
              className={`custom-tag ${selectedTag === '全部' ? 'selected' : ''
                }`}
              onClick={() => handleTagClick('全部')}
            >
              全部
            </Tag>
            <Tag
              className={`custom-tag ${selectedTag === '热门' ? 'selected' : ''
                }`}
              onClick={() => handleTagClick('热门')}
            >
              热门
            </Tag>

            {categoryList.map((category, index) => (
              <Tag
                key={index}
                className={`custom-tag ${selectedTag === category.name ? 'selected' : ''
                  }`}
                onClick={() => handleTagClick(category.name, category.id)}
              >
                {category.name}
              </Tag>
            ))}
          </div>

          <div style={{ marginTop: '24px' }}>
            <Row gutter={[16, 16]}>
              {cardData.map((card, index) => (
                <Col key={index} xs={24} sm={12} md={6}>
                  <NavLink to={`/ai/prompt/${card.id}`}>
                    <TipsCard
                      title={card.name}
                      description={card.scene_desc}
                      style={{ height: '120px' }}
                    />
                  </NavLink>
                </Col>
              ))}
              {/* 其他 TipsCard 组件... */}
            </Row>
          </div>
        </div>
      )}
    </PageContainer>
  );
};

export default TipsBagPage;
