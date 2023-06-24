import { request } from '@umijs/max';
import Cookies from 'js-cookie';

const defaultToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMTE5IiwiZXhwIjoxNzA0NDYyMzk1LCJpYXQiOjE2ODU3MTM1OTUsImlzcyI6InRlc3QifQ.jfVomRADsD1IaiEjV37Ovvjuukzarflqx_BFDo0kG5o';
//const defaultToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyNjAwMDAiLCJleHAiOjE3MDU0MDkzNDksImlhdCI6MTY4NjY2MDU0OSwiaXNzIjoidGVzdCJ9.ACRdI-Y3Mc6UKvOIo7wO2mHVdJKi-97q-hsZEUy0EXE';

export async function wxlogin() {
  let domain = window.location.hostname;

  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname.startsWith('192.168.') ||
    window.location.hostname.startsWith('testchat.kimways.com')
  ) {
    // 在本地开发环境中 或者测试环境中
    console.log('在本地开发环境中 或者测试环境中 wxlogin omain >>>>', domain);
    Cookies.set('token', defaultToken);
    window.location.reload();
    return;
  }
  console.log('wxlogin omain >>>>', domain);
  if (window.WeixinJSBridge) {
    window.location.href = `https://www.kimways.com/api/chat/wechat/oauth/code?redirect_url=${encodeURIComponent(
      window.location.href,
    )}`;
  } else {
    window.location.href = `https://www.kimways.com/api/chat/wechat/web/oauth/code?redirect_url=${encodeURIComponent(
      window.location.href,
    )}`;
  }
}

export async function logout() {
  Cookies.remove('token');
  // 重定向主页面
  window.location.href = '/';
  //window.location.reload();
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
    return await request(`/api/chat/user/list`, {
        method: 'POST',
        data: params,
      });
}
