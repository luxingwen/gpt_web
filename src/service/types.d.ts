declare namespace API {
  export interface Response<T> {
    errno: number;
    errmsg: string;
    data: T;
  }

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

  // 消息类型定义
  export interface MessageType {
    msg_id: any;
    msg: string;
    self: boolean;
    is_end: boolean;
    time: string;
    avatar: string;
  }
}
