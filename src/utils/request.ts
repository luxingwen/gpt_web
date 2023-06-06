import { extend } from 'umi-request';
import Cookies from 'js-cookie';

let defaultToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiIyMTE5IiwiZXhwIjoxNzA0NDYyMzk1LCJpYXQiOjE2ODU3MTM1OTUsImlzcyI6InRlc3QifQ.jfVomRADsD1IaiEjV37Ovvjuukzarflqx_BFDo0kG5o';

const request = extend({
  errorHandler: function (error) {
    const { response } = error;
    if (response && response.status !== 200) {
      // 请求已发送但服务端返回状态码非200系列
      console.log(response);
    } else if (!response) {
      // 请求尚未发送就失败，网络问题或者请求被阻止等原因
      console.log('failed');
    }
    throw error; // 如果throw. 错误将继续抛出.
  },
  credentials: 'include', // 默认请求是否带上cookie
});

// 添加请求拦截器
request.interceptors.request.use((url, options) => {
  const header = {};

  header['X-Nideshop-Token'] = Cookies.get('token');
  if (
    !header['X-Nideshop-Token'] ||
    header['X-Nideshop-Token'] === 'undefined'
  ) {
    console.log('token不存在');
    header['X-Nideshop-Token'] = defaultToken;
  }

  return {
    url: url,
    options: {
      ...options,
      headers: header,
    },
  };
});

// 添加响应拦截器
request.interceptors.response.use(async (response) => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.indexOf('application/json') !== -1) {
    const data = await response.clone().json();
    console.log('res >>>>>', data);
    if (data.errno === 401) {
      // TODO: 根据具体逻辑进行处理
      //   userLogin();
    }
    return response;
  } else {
    const data = await response.clone().text();
    console.log('res >>>>>', data);
    // TODO: Handle the non-JSON response as needed
    return response;
  }
});
export default request;
