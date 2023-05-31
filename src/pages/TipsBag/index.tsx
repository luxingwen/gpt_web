import React, { useState } from 'react';
import { Input, Tag, Row, Col, Card } from 'antd';

import ContentLayout from '@/layouts/index';
import TipsCard from '@/components/TipsCard';

import './index.less';

const TipsBagPage = () => {
  const [selectedTag, setSelectedTag] = useState(null);

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const cardData = [
    { title: '标题1', description: '描述1' },
    { title: '标题2', description: '描述2' },
    { title: '标题3', description: '描述3' },
    { title: '标题1', description: '描述1' },
    { title: '标题2', description: '描述2' },
    { title: '标题3', description: '描述3' },
    { title: '标题1', description: '描述1' },
    { title: '标题2', description: '描述2' },
    {
      title: '标题3',
      description: '描述31111111111111111111111111111111s222111111111',
    },
    // 更多数据...
  ];

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
        <Tag
          className={`custom-tag ${selectedTag === '职业' ? 'selected' : ''}`}
          onClick={() => handleTagClick('职业')}
        >
          职业
        </Tag>
        <Tag
          className={`custom-tag ${selectedTag === '编程' ? 'selected' : ''}`}
          onClick={() => handleTagClick('编程')}
        >
          编程
        </Tag>
        <Tag
          className={`custom-tag ${
            selectedTag === '内容创作' ? 'selected' : ''
          }`}
          onClick={() => handleTagClick('内容创作')}
        >
          内容创作
        </Tag>
        <Tag
          className={`custom-tag ${selectedTag === '文案' ? 'selected' : ''}`}
          onClick={() => handleTagClick('文案')}
        >
          文案
        </Tag>
      </div>

      <div style={{ marginTop: '24px' }}>
        <Row gutter={[16, 16]}>
          {cardData.map((card, index) => (
            <Col key={index} xs={24} sm={12} md={6}>
              <TipsCard
                title={card.title}
                description={card.description}
                style={{ height: '120px' }}
              />
            </Col>
          ))}
          {/* 其他 TipsCard 组件... */}
        </Row>
      </div>
    </ContentLayout>
  );
};

export default TipsBagPage;
