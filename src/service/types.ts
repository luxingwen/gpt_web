namespace API {
  // 获取会话信息
  export interface ReqChatSessionInfo {
    name: string;
    scene_id: string;
    chat_type: string;
  }

  // 个人知识助手，提交聊天内容
  export interface ReqSmartChatCompletion {
    scene_id: string;
    content: string;
    session_id: number;
  }

  export interface ReqDeleteSmartScene {
    id: number;
  }

  export interface ChatSmartScene {
    id: number;
    user_id: number;
    scene_name: string;
    scene_id: string;
    add_time: number;
    company: string;
    ai_name: string;
    ai_avatar: string;
    share_type: string;
    share_users: string;
    create_time: Date;
  }
}
