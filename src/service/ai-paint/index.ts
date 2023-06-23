import { request } from '@umijs/max';

// ai绘画 文本生成图片
export async function aiDrawTextToImage(body: API.SDTextToImageParam) {
  return await request(`/api/chat/sd/text/image`, {
    method: 'POST',
    data: body,
  });
}

// ai绘画 图片生成图片
export async function aiDrawImageToImage(body: API.SDImageToImageParam) {
  return await request(`/api/chat/sd/image/to/image`, {
    method: 'POST',
    data: body,
  });
}



// 获取提示词
export async function getPromptWords(props: any) {
  return await request(`/api/chat/sd/prompt/word/list`, {
    method: 'GET',
    params: props,
  });
}

// 获取热门绘画
export async function getHotAiDraws(props: API.ReqHotImages) {
  return await request(`/api/chat/sd/hot/images`, {
    method: 'GET',
    params: props,
  });
}

// 获取AI绘画模型
export async function getAiDrawModels(props: any) {
  return await request<API.Response<API.SdModel[]>>(`/api/chat/sd/model/names`, {
    method: 'GET',
    params: props,
  });
}

// ai绘画 获取进度
export async function aiDrawProcess(props: any) {
  return await request(`/api/chat/sd/process`, {
    method: 'GET',
    params: props,
  });
}

// 获取ai绘画的图片列表
export async function aiDrawImages(props: any) {
  return await request(`/api/chat/sd/images`, {
    method: 'GET',
    params: props,
  });
}

// 删除ai绘画的图片
export async function delAiDrawImages(props: any) {
  return await request(`/api/chat/sd/image/del`, {
    method: 'POST',
    data: props,
  });
}

//ai绘画生成热门的画
export async function hotAiDrawImage(props: any) {
  return await request(`/api/chat/sd/hot/images`, {
    method: 'GET',
    params: props,
  });
}


// 上传文件
export async function uploadImage(props: any) {
  return await request(`/api/chat/image/upload`, {
    method: 'POST',
    data: props,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

