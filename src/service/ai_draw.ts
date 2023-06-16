import { request } from '@umijs/max';

//获取提示词
export async function getPromptWords(props: any) {
  try {
    return request(`/api/chat/sd/prompt/word/list`, {
      method: 'GET',
      params: props,
    });
  } catch (error) {}
}

// 获取热门绘画
export async function getHotAiDraws(props: API.ReqHotImages) {
  try {
    return request(`/api/chat/sd/hot/images`, {
      method: 'GET',
      params: props,
    });
  } catch (error) {}
}

// 获取AI绘画模型
export async function getAiDrawModels(props: any) {
  try {
    return request<API.Response<API.SdModel[]>>(`/api/chat/sd/model/names`, {
      method: 'GET',
      params: props,
    });
  } catch (error) {}
}

// ai绘画 文本生成图片
export async function aiDrawTextToImage(props: any) {
  try {
    return request(`/api/chat/sd/text/image`, {
      method: 'POST',
      data: props,
    });
  } catch (error) {}
}

// ai绘画 图片生成图片
export async function aiDrawImageToImage(props: any) {
  try {
    return request(`/api/chat/sd/image/to/image`, {
      method: 'POST',
      data: props,
    });
  } catch (error) {}
}

//ai绘画 获取进度
export async function aiDrawProcess(props: any) {
  try {
    return request(`/api/chat/sd/process`, {
      method: 'POST',
      data: props,
    });
  } catch (error) {}
}

// 获取ai绘画的 图片列表
export async function aiDrawImages(props: any) {
  try {
    return request(`/api/chat/sd/images`, {
      method: 'GET',
      params: props,
    });
  } catch (error) {}
}

// 删除ai绘画的 图片
export async function delAiDrawImages(props: any) {
  try {
    return request(`/api/chat/sd/image/del`, {
      method: 'POST',
      data: props,
    });
  } catch (error) {}
}
