// import { api, CREATROW } from '@/domain';
import { cmdDispatcher, transformResponse } from '@/domain/core';
import request from '@/domain/request/request';
import { CommandOptions } from '@/domain/types';
import { api, CREATROW, EDITROW } from '../domain.command';

const newRow = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.newRow, {
    cancelToken: options.token,
    method: 'post',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
  // if (err != null) return Promise.reject(err);
  // if (res) {
  //   const { code, data } = res.data;
  //   if (code == ResponseCode.Failure)
  //     return Promise.reject(new ServiceCodeError(code));
  //   const reqest = options.request || {};
  //   reqest['params'] = reqest.params || {};
  //   reqest.params['view_id'] = options.request?.data?.view_id;
  //   options['request'] = reqest;
  //   return readRowOrders(options);
  // }
  // return Promise.reject(new NullResponseError());
};

const readRowOrders = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.rowOrders, {
    cancelToken: options.token,
    params: { ...options.request?.params },
  });
  return transformResponse(options, err, res);
};

const editRow = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.row(options.request?.path?.id), {
    method: 'put',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [CREATROW]: newRow,
  [EDITROW]: editRow,
});
