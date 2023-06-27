import HistorySession from '@/components/HistorySession/HistorySession';
import LeftContent from '@/layouts/left';
import { useState } from 'react';
import { history } from '@umijs/max';

import './LeftNav.less';

const VerticalNav = ({ setViewContent }) => {
  const [activeButton, setActiveButton] = useState(''); // State for active button

  const handleSceneButtonClick = (content) => {
    setViewContent(content);
    setActiveButton(content); // Update active button state
    history.push(`/smart-ai/${content}`);
  };

  const headerContent = (
    <div className="button-container">
      <button
        className={`custom-button ${activeButton === 'scene-list' ? 'active' : ''
          }`}
        onClick={() => handleSceneButtonClick('scene-list')}
      >
        场景广场
      </button>
      <button
        className={`custom-button ${activeButton === 'create-scene' ? 'active' : ''
          }`}
        onClick={() => handleSceneButtonClick('create-scene')}
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
