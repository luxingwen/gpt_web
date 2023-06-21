declare namespace API {

    // 个人知识助手，提交聊天内容
    export interface ReqSmartChatCompletion {
        uuids: string[];
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
        params: string;
        add_time: number;
        company: string;
        ai_name: string;
        ai_avatar: string;
        share_type: string;
        share_users: string;
        create_time: Date;
    }


    export interface ReqGetSmartSceneInfo {
        id: number;
      }
      

}