import request from '@/utils/request';

export async function getUserInfo() {
  try {
    return request(`/api/chat/user`, {
      method: 'GET',
    });
  } catch (error) {
    throw error;
  }
}

export async function queryChatGoods() {
  try {
    return request(`/api/chat/goods`, {
      method: 'GET',
    });
  } catch (error) {
    throw error;
  }
}

export async function getAllScenes() {
  try {
    return request(`/api/chat/all/prompt/scenes`, {
      method: 'GET',
    });
  } catch (error) {}
}

export async function getHistoryChatMessage(props: any) {
  try {
    return request(`/api/chat/messages`, {
      method: 'GET',
      params: props,
    });
  } catch (error) {}
}

export async function queryQuestion(prompt, scene: number) {
  try {
    return request(`/api/chat/question`, {
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
  } catch (error) {}
}

export async function getLatestUsedScenes() {
  try {
    return request(`/api/chat/prompt/latest/use/scenes`, {
      method: 'GET',
    });
  } catch (error) {}
}

export async function getGoods() {
  try {
    return request(`/api/chat/goods`, {
      method: 'GET',
    });
  } catch (error) {}
}

export async function getPromptScenesInfo(props: any) {
  try {
    return request(`/api/chat/all/prompt/scene`, {
      method: 'GET',
      params: props,
    });
  } catch (error) {}
}

export async function invitionCode(props: any) {
  try {
    return request(`/api/chat/invite/code`, {
      method: 'POST',
      data: props,
    });
  } catch (error) {}
}

export async function getInvitionStatic() {
  try {
    return request(`/api/chat/invite/statistics`, {
      method: 'GET',
    });
  } catch (error) {}
}

export async function exchangeByCode(params: any) {
  try {
    return request(`/api/chat/code`, {
      method: 'GET',
      params: params,
    });
  } catch (error) {}
}

export async function orderSubmit(params: any) {
  try {
    return request(`/api/chat/order/submit`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}

export async function prePay(params: any) {
  try {
    return request(`/api/chat/order/pay/prepay`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}
