import { request } from '@umijs/max';

// 获取会话信息
export async function getSessionInfo(params: API.ReqChatSessionInfo) {
  return await request<API.Response<API.ChatSession>>(
    `/api/chat/session/info`,
    {
      method: 'POST',
      data: params,
    },
  );
}

//  获取会话信息列表
export async function getSessionList(params: API.ReqChatSessionList) {
  return await request('/api/chat/sessions', {
    method: 'GET',
    params: params,
  });
}

// 获取热门问题
export async function queryHotQuestion(params: any) {
  return await request(`/api/chat/hot/question`, {
    method: 'GET',
    params: params,
  });
}

// 新建会话
export async function newChatSession(params: any) {
  return await request(`/api/chat/session`, {
    method: 'POST',
    data: params,
  });
}
