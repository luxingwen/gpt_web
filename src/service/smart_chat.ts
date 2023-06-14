import request from '@/utils/request';

export async function getSmartSceneList(params: any) {
  try {
    return request(`/api/v1/smart/scene/list`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}

export async function createmartScene(params: any) {
  try {
    return request(`/api/v1/smart/scene/new`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}

// 个人知识库 请求聊天内容接口
export async function smartChatCompletions(params: API.ReqChatSessionInfo) {
  try {
    return request(`/api/v1/smart/chat/completions`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}

export async function deleteSmartScene(params: API.ReqDeleteSmartScene) {
  try {
    return request(`/api/v1/smart/scene/del`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}
