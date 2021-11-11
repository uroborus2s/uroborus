import {
  api,
  CREATTABLE,
  CREATTABLEBYFILE,
  EDITTABLE,
} from '../domain.command';
import { NullResponseError } from '../error';
import { ServiceCodeError } from '../request/error';
import request, { ResponseCode } from '../request/request';
import { CommandOptions, DataResponse } from '../types';
import { cmdDispatcher, transformResponse } from '../core';

const readAllTables = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.table(), {
    cancelToken: options.token,
    params: { base_id: options.request?.params?.base_id },
  });
  if (err != null) return Promise.reject(err);
  if (res) {
    const { code, data } = res.data as DataResponse;
    if (code == ResponseCode.Failure)
      return Promise.reject(new ServiceCodeError(code));
    return Promise.resolve({
      ...options,
      response: {
        tables: data.data,
      },
    });
  }
  return Promise.reject(new NullResponseError());
};

const creatTable = (url: string) =>
  async function (options: CommandOptions) {
    const [err, res] = await request(url, {
      cancelToken: options.token,
      method: 'post',
      data: { ...options.request?.data },
    });
    if (err != null) return Promise.reject(err);
    if (res) {
      const { code } = res.data;
      if (code == ResponseCode.Failure)
        return Promise.reject(new ServiceCodeError(code));
      const reqest = options.request || {};
      reqest['params'] = reqest.params || {};
      reqest.params['base_id'] = options.request?.data?.base_id;
      options['request'] = reqest;
      return readAllTables(options);
    }
    return Promise.reject(new NullResponseError());
  };

const editTable = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.table(options.request?.path?.id), {
    cancelToken: options.token,
    method: 'put',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [CREATTABLE]: creatTable(api.path.table()),
  [CREATTABLEBYFILE]: creatTable(api.path.uploadTable),
  [EDITTABLE]: editTable,
});
