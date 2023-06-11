import request from '@/utils/request';

export async function getSmartSceneList(params: any) {
  try {
    return request(`/api/v1/smart/scene/list`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}
