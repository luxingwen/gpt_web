import { request } from '@umijs/max';

export async function getSmartSceneList(params: any) {
  return await request(`/api/v1/smart/scene/list`, {
    method: 'POST',
    data: params,
  });
}

export async function createSmartScene(params: any) {
  return await request(`/api/v1/smart/scene/new`, {
    method: 'POST',
    data: params,
  });
}

// 个人知识库 请求聊天内容接口
export async function smartChatCompletions(params: API.ReqSmartChatCompletion) {
  return await request(`/api/v1/smart/chat/completions`, {
    method: 'POST',
    data: params,
  });
}

export async function deleteSmartScene(params: API.ReqDeleteSmartScene) {
  return await request(`/api/v1/smart/scene/del`, {
    method: 'POST',
    data: params,
  });
}

export async function getSmartSceneInfo(params: API.ReqGetSmartSceneInfo) {
  return await request(`/api/v1/smart/scene/info`, {
    method: 'POST',
    data: params,
  });
}