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
