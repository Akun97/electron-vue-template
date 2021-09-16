import axios from 'axios';
import { ipcRenderer } from 'electron';

function baseUrl() {
  return process.env.NODE_ENV === 'development' ? '/api' : 'https://api.pd.theseyun.com';
}
// 创建 axios 实例
let service = axios;

service.defaults.timeout = 60000;
// service.defaults.baseURL = baseUrl;
service.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8';
//允许携带cookiewithCredentials的情况下，后端要设置Access-Control-Allow-Origin为你的源地址，
//例如http://localhost:8080，不能是*，而且还要设置header(‘Access-Control-Allow-Credentials: true’),
service.defaults.withCredentials = true;
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put') {    
      if (config.data.token) {
        config.headers.token = config.data.token;
      }
      delete config.data.token;
    } else {    
      if (config.params.token) {
        config.headers.token = config.params.token;
      }
      delete config.params.token;
    }
    if (config.method === 'post' || config.method === 'put') {
      // post、put 提交时，将对象转换为string, 为处理Java后台解析问题
      config.data = JSON.stringify(config.data);
    }
    // 请求发送前进行处理
    return config;
  },
  error => {
    // 请求错误处理
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  (response) => {
    if (response.data.code === 0 || response.data.code === 10054) {
      let { data } = response;
      return data;
    } else {
      switch (response.data.code) {
        case 10020:
        case 10021:
        case 401:
          ipcRenderer.send('notification', '登录过期，请重新登录');
          return;
        default:
          if (response.data.msg) {
            ipcRenderer.send('notification', response.data.msg);
          }
          return;
      }
    }
  },
  (error) => {
    let info = {};
    if (!error.response) {
      info = {
        code: 500,
        msg: 'Network Error'
      };
      ipcRenderer.send('notification', 'Network Error');
      return;
    } else {
      ipcRenderer.send('notification', `${error.response.statusText} code:${error.response.status}`);
      return;
    }
  }
);
/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export function get(url, params, headers) {
  let options = {};
  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.get(baseUrl()+url, options);
}

export function post(url, data, headers) {
  let options = {};
  if (headers) {
    options.headers = headers;
  }
  return service.post(baseUrl()+url, data, options);
}

export function put(url, data, headers) {
  let options = {};
  if (headers) {
    options.headers = headers;
  }
  return service.put(baseUrl()+url, data, options);
}

export function del(url, params, headers) {
  let options = {};
  if (params) {
    options.params = params;
  }
  if (headers) {
    options.headers = headers;
  }
  return service.delete(baseUrl()+url, options);
}