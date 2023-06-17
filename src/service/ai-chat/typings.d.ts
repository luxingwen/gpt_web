declare namespace API {

    // 获取会话信息
    export interface ReqChatSessionInfo {
        name: string;
        scene_id: string;
        chat_type: string;
    }


    // 获取会话信息列表
    export interface ReqChatSessionList {
        page: number;
        per_page: number;
        chat_type: string;
        scene_id?: string;
    }



    // 历史会话记录
    export interface ChatSession {
        id: number;
        user_id: number;
        name: string;
        message: string;
        last_message_time: number;
        create_time: number;
        is_manual_set: boolean;
        is_del: number;
        chat_type: string;
        scene_id: string;
    }

    export enum ChatType {
        AIChat = 'ai-chat',
        SmartChat = 'smart-chat',
    }



}