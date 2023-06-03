import React, { useState, useEffect } from 'react';
import { Input, Tag, Row, Col, Card } from 'antd';

import ContentLayout from '@/layouts/index';
import TipsCard from '@/components/TipsCard';

import { getAllScenes } from '@/service/api';
import { NavLink, useLocation } from 'react-router-dom';
import './index.less';

const TipsBagPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);
  const [allCardData, setAllCardData] = useState([]);
  const [hotCardData, setHotCardData] = useState([]);
  const [scenesByCategoryId, setScenesByCategoryId] = useState({});
  const [cardData, setCardData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    getAllScenes().then((res) => {
      console.log('getAllScenes', res.data);
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
    });
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

  return (
    <ContentLayout>
      <Input.Search
        placeholder="输入关键词进行搜索"
        style={{ marginTop: '22px' }}
      />
      <div style={{ marginTop: '24px' }}>
        <Tag
          className={`custom-tag ${selectedTag === '全部' ? 'selected' : ''}`}
          onClick={() => handleTagClick('全部')}
        >
          全部
        </Tag>
        <Tag
          className={`custom-tag ${selectedTag === '热门' ? 'selected' : ''}`}
          onClick={() => handleTagClick('热门')}
        >
          热门
        </Tag>

        {categoryList.map((category, index) => (
          <Tag
            key={index}
            className={`custom-tag ${
              selectedTag === category.name ? 'selected' : ''
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
              <NavLink to={`/tips/bag/chat/${card.id}`}>
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
    </ContentLayout>
  );
};

export default TipsBagPage;
