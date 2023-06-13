import React, { useState } from 'react';
import { Modal, Input, List, Avatar, Button, message } from 'antd';
import { getUserList } from '@/service/user';
import './UserSelect.less';

const testUser = [
  { id: 1, nickname: 'User 1', avatar: 'avatar1.jpg' },
  { id: 2, nickname: 'User 2', avatar: 'avatar2.jpg' },
  { id: 3, nickname: 'User 3', avatar: 'avatar3.jpg' },
];

const UserSelect = ({ setUserList }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleUserSelect = (user) => {
    setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    setUserList((prevUserList) => [...prevUserList, user.id]);

    // 从searchResults中移除已选择的用户
    setSearchResults((prevSearchResults) =>
      prevSearchResults.filter((result) => result.id !== user.id),
    );
  };

  const handleEnterPress = (e) => {
    if (e.key === 'Enter') {
      // 处理回车键事件逻辑
      console.log('Enter key pressed');
      // ...

      getUserList({ args: searchText })
        .then((res) => {
          console.log(res);
          if (res.errno === 0) {
            if (res.data.length === 0) {
              message.info('没有找到相关用户');
            }

            // 从搜索结果中移除已选择的用户
            const filteredResults = res.data.filter(
              (result) =>
                !selectedUsers.some(
                  (selectedUser) => selectedUser.id === result.id,
                ),
            );

            setSearchResults(filteredResults);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="user-select-container">
      <div className="user-select-row">
        <div className="user-select-header">有权限访问的人</div>
        <Button type="primary" onClick={handleOpenModal}>
          添加用户
        </Button>
      </div>

      <div className="user-list-container">
        <List
          className="user-list"
          itemLayout="horizontal"
          dataSource={selectedUsers}
          renderItem={(user) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={user.avatar} />}
                title={user.nickname}
              />
            </List.Item>
          )}
        />
      </div>
      <Modal
        className="custom-modal"
        title="添加访问者"
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Input
          placeholder="搜索用户"
          value={searchText}
          onChange={handleSearchChange}
          onPressEnter={handleEnterPress}
        />
        <List
          className="user-search-list"
          itemLayout="horizontal"
          dataSource={searchResults}
          renderItem={(user) => (
            <List.Item
              actions={[
                <Button type="link" onClick={() => handleUserSelect(user)}>
                  添加
                </Button>,
              ]}
            >
              <List.Item.Meta
                avatar={<Avatar src={user.avatar} />}
                title={user.nickname}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default UserSelect;
