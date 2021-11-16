import { cmdDispatcher, transformResponse } from '../core';
import { api, CREATVIEW } from '../domain.command';
import { NullResponseError } from '../error';
import { ServiceCodeError } from '../request/error';
import request, { ResponseCode } from '../request/request';
import { CommandOptions, DataResponse, TableRsp } from '../types';

const creatView = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.view(options.request?.path?.id), {
    cancelToken: options.token,
    method: 'post',
    data: { ...options.request?.data },
  });
  if (err != null) return Promise.reject(err);
  if (res) {
    const { code, data } = res.data as DataResponse<TableRsp>;
    if (code == ResponseCode.Failure)
      return Promise.reject(new ServiceCodeError(code));
    const reqest = options.request || {};
    reqest['params'] = reqest.params || {};
    reqest.params['baseId'] = options.request?.data?.base_id;
    reqest.params['tableId'] = options.request?.data?.table_id;
    options['request'] = reqest;
    return readAllViews(options);
  }
  return Promise.reject(new NullResponseError());
};

const readAllViews = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.view(), {
    cancelToken: options.token,
    params: { table_id: options.request?.params?.tableId },
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [CREATVIEW]: creatView,
});
