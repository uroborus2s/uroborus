/**
 * request 网络请求工具
 */
import { extend, ResponseError } from 'umi-request';
import { CodeMessage, RequestError } from './request-types';

/**
 * 异常处理程序
 */
const errorHandler = ({ response }: ResponseError) => {
  let error: RequestError;
  if (response && response.status) {
    const errorText = CodeMessage[response.status] || response.statusText;
    const { status, url } = response;
    error = new Error(response.statusText) as RequestError;
    const info = { message: errorText, error: [{ url: url, status: status }] };
    error.info = info;
    throw error;
  } else if (!response) {
    error = new Error('unknown error!') as RequestError;
    const info = { message: '您的网络发生异常，无法连接服务器!' };
    error.info = info;
    throw error;
  }
};

/**
 * 配置request请求时的默认参数
 */
export const request = extend({
  timeout: 15000,
  prefix: '/api/v1',
  errorHandler, // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
  getResponse: false,
});
