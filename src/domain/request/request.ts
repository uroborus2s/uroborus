/**
 * ibr-request 网络请求工具
 */
import axios, { AxiosRequestConfig } from 'axios';
import { history } from 'umi';
import {
  promiseWithError,
  ServiceStatusError,
  ServiceTimeoutError,
  ServiceUnknownError,
} from '../';

const codeMessage = {
  '200': '服务器成功返回请求的数据。',
  '201': '新建或修改数据成功。',
  '202': '一个请求已经进入后台排队（异步任务）。',
  '204': '删除数据成功。',
  '400': '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  '401': '用户没有权限（令牌、用户名、密码错误）。',
  '403': '用户得到授权，但是访问是被禁止的。',
  '404': '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  '406': '请求的格式不可得。',
  '410': '请求的资源被永久删除，且不会再得到的。',
  '422': '当创建一个对象时，发生一个验证错误。',
  '500': '服务器发生错误，请检查服务器。',
  '502': '网关错误。',
  '503': '服务不可用，服务器暂时过载或维护。',
  '504': '网关超时。',
} as const;

type CodeKey = keyof typeof codeMessage;

export enum ResponseCode {
  Failure,
  Success,
}

const arequest = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
  withCredentials: true,
});

//对所有错误进行处理，增加提示语和统一错误吗
arequest.interceptors.response.use(
  (response) => response,
  (error) => {
    let cerro: Error;
    if (axios.isCancel(error)) {
      cerro = error;
    } else if (error.response) {
      const status: CodeKey = error.response.status as CodeKey;
      const message = codeMessage[status];
      if (status == '401') {
        history.push('/desktop');
      }
      cerro = new ServiceStatusError(status, message);
    } else if (error.request) {
      cerro = new ServiceTimeoutError('请求已发送，服务器超时未响应！');
    } else {
      cerro = new ServiceUnknownError('未知错误！');
    }
    return Promise.reject(cerro);
  },
);

export default function request(url: string, config?: AxiosRequestConfig) {
  return promiseWithError(arequest(url, config));
}
