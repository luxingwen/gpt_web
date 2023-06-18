import { request } from '@umijs/max';
import Cookies from 'js-cookie';


const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMTE5IiwiZXhwIjoxNzA0NDYyMzk1LCJpYXQiOjE2ODU3MTM1OTUsImlzcyI6InRlc3QifQ.jfVomRADsD1IaiEjV37Ovvjuukzarflqx_BFDo0kG5o';
//const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyNjAwMDAiLCJleHAiOjE3MDU0MDkzNDksImlhdCI6MTY4NjY2MDU0OSwiaXNzIjoidGVzdCJ9.ACRdI-Y3Mc6UKvOIo7wO2mHVdJKi-97q-hsZEUy0EXE';


export async function wxlogin() {
  Cookies.set('token', defaultToken);
  window.location.reload();
  return;

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

export async function getUserInfo() {
  return await request<{
    data: API.User;
    errmsg: string;
    errno: number;
  }>(`/api/chat/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getUserList(params: any) {
  try {
    return request<API.Response<API.User[]>(`/api/chat/user/list`, {
      method: 'POST',
      data: params,
    });
  } catch (error) {}
}
