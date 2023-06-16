import HistorySession from '@/components/HistorySession/HistorySession';
import LeftContent from '@/layouts/left';
import { useState } from 'react';

import './LeftNav.less';

const VerticalNav = ({ setViewContent }) => {
  const [activeButton, setActiveButton] = useState(''); // State for active button

  const handleSceneButtonClick = (content) => {
    setViewContent(content);
    setActiveButton(content); // Update active button state
  };

  const headerContent = (
    <div className="button-container">
      <button
        className={`custom-button ${
          activeButton === 'scene_list' ? 'active' : ''
        }`}
        onClick={() => handleSceneButtonClick('scene_list')}
      >
        场景广场
      </button>
      <button
        className={`custom-button ${
          activeButton === 'create_scene' ? 'active' : ''
        }`}
        onClick={() => handleSceneButtonClick('create_scene')}
      >
        创建新场景
      </button>
    </div>
  );

  const handleChatSessionClick = (id) => {
    console.log(id);
  };

  const centerContent = (
    <HistorySession chat_type="smart_chat" onClick={handleChatSessionClick} />
  );

  return (
    <LeftContent headerContent={headerContent} centerContent={centerContent} />
  );
};

export default VerticalNav;
