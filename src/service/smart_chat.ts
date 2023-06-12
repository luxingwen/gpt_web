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
