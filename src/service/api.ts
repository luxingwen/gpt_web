import { request } from '@umijs/max';


export async function getUserInfo() {
  return await request(`/api/chat/user`, {
    method: 'GET',
  });
}

export async function queryChatGoods(props:API.ReqGoodsType) {
  return await request(`/api/chat/goods`, {
    method: 'GET',
  });
}

export async function getAllScenes() {
  return await request(`/api/chat/all/prompt/scenes`, {
    method: 'GET',
  });
}

export async function getHistoryChatMessage(props: any) {
  return await request(`/api/chat/messages`, {
    method: 'GET',
    params: props,
  });
}

export async function queryQuestion(prompt: string, scene: number) {
  return await request(`/api/chat/question`, {
    method: 'POST',
    data: {
      prompt,
      model: 'text-davinci-003',
      max_tokens: 2048,
      temperature: 0.7,
      top_p: 1,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,
      best_of: 1,
      scene,
      // stop: ['\n']
    },
  });
}

export async function getLatestUsedScenes() {
  return await request(`/api/chat/prompt/latest/use/scenes`, {
    method: 'GET',
  });
}

export async function getGoods() {
  return await request(`/api/chat/goods`, {
    method: 'GET',
  });
}

export async function getPromptScenesInfo(props: any) {
  return await request(`/api/chat/all/prompt/scene`, {
    method: 'GET',
    params: props,
  });
}

export async function invitionCode(props: any) {
  return await request(`/api/chat/invite/code`, {
    method: 'POST',
    data: props,
  });
}

export async function getInvitionStatic() {
  return await request(`/api/chat/invite/statistics`, {
    method: 'GET',
  });
}

export async function exchangeByCode(params: any) {
  return await request(`/api/chat/code`, {
    method: 'GET',
    params: params,
  });
}

export async function orderSubmit(params: any) {
  return await request(`/api/chat/order/submit`, {
    method: 'POST',
    data: params,
  });
}

export async function prePay(params: any) {
  return await request(`/api/chat/order/pay/prepay`, {
    method: 'POST',
    data: params,
  });
}



