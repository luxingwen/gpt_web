import request from '@/utils/request';

export async function wxlogin() {
  if (window.WeixinJSBridge) {
    window.location.href = `https://chat.kimways.com/api/chat/wechat/oauth/code?redirect_url=${encodeURIComponent(
      window.location.href,
    )}`;
  } else {
    window.location.href = `https://chat.kimways.com/api/chat/wechat/web/oauth/code?redirect_url=${encodeURIComponent(
      window.location.href,
    )}`;
  }
}

export async function getUserList(params: any) {
  try {
    return request(`/api/chat/user/list`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}
