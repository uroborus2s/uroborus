/**
 * ibr-request 网络请求工具
 */
import axios, { AxiosRequestConfig, AxiosResponse, Canceler } from 'axios';
import { apiBaseUrl } from './api-path';
import { DataResponse, ResponseCode } from '@ibr-types/index';

/**
 * 异常处理程序
 */
const CancelToken = axios.CancelToken;
const pending: Record<string, Canceler> = {};
const stop = (key: string, cancel: Canceler) => {
  if (pending[key]) {
    cancel('禁止重复请求');
  } else pending[key] = cancel;
};

const allow = (key: string) => {
  if (pending[key]) {
    delete pending[key];
  }
};

const getRequestIdentify = (config: AxiosRequestConfig, isReuest = false) => {
  const { url, baseURL, method, data = {}, params = {} } = config;
  let reqId = url ?? '';
  if (isReuest && url)
    reqId = baseURL ? baseURL.concat(url.substring(1)) : url.substring(1);
  return method === 'get'
    ? encodeURIComponent(reqId.concat(JSON.stringify(params)))
    : encodeURIComponent(reqId.concat(JSON.stringify(data)));
};

const request = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
});

export default request;

//拦截重复请求
request.interceptors.request.use(
  (config) => {
    const reqId = getRequestIdentify(config, true);
    config.cancelToken = new CancelToken((cancel) => {
      stop(reqId, cancel);
    });
    return config;
  },
  (error) => Promise.reject(error),
);

//拦截响应，对错误进行统一处理
request.interceptors.response.use(
  (response) => {
    setTimeout(() => {
      allow(getRequestIdentify(response.config));
    }, 1000);
    return response;
  },
  (error) => {
    if (axios.isCancel(error)) {
      console.log(`请求已经取消！${error.message}`);
    } else {
      setTimeout(() => {
        allow(getRequestIdentify(error.config));
      }, 1000);
    }
    return Promise.reject(error);
  },
);

//对响应进行拦截处理，服务器返回code错误设置成reject状态
request.interceptors.response.use(
  (response: AxiosResponse<DataResponse>) => {
    console.log(response.status, typeof response.status);
    const serviceData = response.data;
    if (serviceData && serviceData.code === ResponseCode.Success) {
      return response;
    } else {
      console.log(
        `${getRequestIdentify(response.config)}请求返回${
          serviceData.code
        }错误！！`,
      );
      return Promise.reject(response);
    }
  },
  (error) => Promise.reject(error),
);

//对所有错误进行处理，增加提示语和统一错误吗
request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error &&
      error.code == 'ECONNABORTED' &&
      error.message.indexOf('timeout') != -1
    ) {
      //  请求超时
    } else if (error && error.response.status) {
      console.log(error.response.status, typeof error.response.status);
    } else {
      //服务器错误
    }
    return Promise.reject(error);
  },
);

//对所有错误进行业务处理，跳转到错误提示页面
request.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);
