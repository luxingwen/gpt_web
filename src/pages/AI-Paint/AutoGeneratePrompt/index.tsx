/*
 * @Module: module.name
 * @Description: your description
 * @Author: draco
 * @Email: draco.coder@gmail.com
 * @Github: https://github.com/draco-china
 * @Date: 2023-06-17 13:54:13
 * @LastEditTime: 2023-06-17 15:04:14
 */
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Space, Tabs, Tag } from 'antd';
import { useState,useEffect } from 'react';
import {getPromptWords} from '@/service/ai-paint';


function AutoGeneratePrompt() {
  const [categoryList, setCategoryList] = useState([]);
  const [defaultActiveKey, setDefaultActiveKey] = useState("1");
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [selectedTagList, setSelectedTagList] = useState(new Set());

// 将项添加到 selectedTagList
  const addItem = (item) => {
    setSelectedTagList(prev => new Set(prev).add(item));
  };
  
  // 将项从 selectedTagList 中移除
  const removeItem = (item) => {
    setSelectedTagList(prev => {
      const updatedSet = new Set(prev);
      updatedSet.delete(item);
      return updatedSet;
    });
  };


  useEffect(() => {
    getPromptWords({}).then((res) => {
      console.log("getPromptWords:",res);
      if(res.errno ===0) {
        let categorylist = [];
        res.data.forEach((item, index) => {
          console.log("index:",index);
          if(index === 0) {
            setDefaultActiveKey(item.id);
            setSubCategoryList(item.words);
          }
          categorylist.push({
            key: item.id,
            label: item.name,
            words: item.words,
          });
         
        });
        console.log("categorylist:",categorylist);
        setCategoryList(categorylist);
      }
    });
  }, []);

  return (
    <PageContainer title={false}>
      <Tabs
        defaultActiveKey={defaultActiveKey}
        items={categoryList}
        onChange={(activeKey) => {
          console.log(activeKey);
          // 根据 activeKey 去请求数据 并更新下面的列表
          categoryList.forEach((item) => {
            console.log("item id:",item.id, "activeKey:",activeKey);
            if(item.key === activeKey) {
              setSubCategoryList(item.words);
              return;
            }
          })
        }}
        className="text-lg"
      />
      <div className="min-h-[135px] p-4">
        <Space size={[0, 8]} wrap>
          {subCategoryList.map((item) => (
            <Tag
              className="px-4 py-2 bg-gray-100 text-gray-700 text-base border-none cursor-pointer"
              key={item.id}
              onClick={(e) => {
                addItem(item);
                e.preventDefault();
                // 点击标签之后，将标签添加到下面的列表中
              }}
            >
              {item.words}
            </Tag>
          ))}
        </Space>
      </div>

      <div className="text-lg text-gray-600 mb-2">自动生成提示词</div>
      <div className=" bg-gray-100 min-h-[135px] p-4">
        <Space size={[0, 8]} wrap>
          {selectedTagList.map((item) => (
            <Tag
              className="px-3 py-2 bg-gray-200 text-gray-700 border-none cursor-pointer"
              key={item.id}
              closable
              onClose={(e) => {
                // 点击关闭按钮之后，将标签从下面的列表中移除
            
                removeItem(item);
                e.preventDefault();
              }}
            >
              {item.words}
            </Tag>
          ))}
        </Space>
      </div>
      <Button type="primary" className="mt-8">
        用提示词画图
      </Button>
    </PageContainer>
  );
}

export default AutoGeneratePrompt;
