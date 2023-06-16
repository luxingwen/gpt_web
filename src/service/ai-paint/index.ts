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
