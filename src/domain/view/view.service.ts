import { cmdDispatcher } from '../core';
import { api, CREATVIEW } from '../domain.command';
import { NullResponseError } from '../error';
import { ServiceCodeError } from '../request/error';
import request, { ResponseCode } from '../request/request';
import { CommandOptions, DataResponse, TableRsp } from '../types';

const creatTable = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.table(options.request?.path?.id), {
    cancelToken: options.token,
  });
  if (err != null) return Promise.reject(err);
  if (res) {
    const { code, data } = res.data as DataResponse<TableRsp>;
    if (code == ResponseCode.Failure)
      return Promise.reject(new ServiceCodeError(code));
    return Promise.resolve({
      ...options,
      response: {
        ...data,
      },
    });
  }
  return Promise.reject(new NullResponseError());
};

export default cmdDispatcher({
  [CREATVIEW]: creatTable,
});
