import { cmdDispatcher, transformResponse } from '../core';
import {
  api,
  CREATVIEW,
  DELETEVIEW,
  DUPLIACTEVIEW,
  EDITVIEW,
} from '../domain.command';
import { NullResponseError } from '../error';
import { ServiceCodeError } from '../request/error';
import request, { ResponseCode } from '../request/request';
import { CommandOptions, DataResponse } from '../types';

//拷贝/创建 view
const creatView = (url: string | ((id: string) => string)) =>
  async function (options: CommandOptions) {
    const [err, res] = await request(
      typeof url === 'function' ? url(options.request?.path?.id) : url,
      {
        cancelToken: options.token,
        method: 'post',
        data: { ...options.request?.data },
      },
    );
    if (err != null) return Promise.reject(err);
    if (res) {
      const { code, data } = res.data as DataResponse;
      if (code == ResponseCode.Failure)
        return Promise.reject(new ServiceCodeError(code));
      const reqest = options.request || {};
      reqest['params'] = reqest.params || {};
      reqest.params['baseId'] = options.request?.data?.base_id;
      reqest.params['tableId'] = options.request?.data?.table_id;
      reqest.params['viewId'] = data.id || data.new_view_id;
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

const editView = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.view(options.request?.path?.id), {
    cancelToken: options.token,
    method: 'put',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

const deleteView = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.view(options.request?.path?.id), {
    cancelToken: options.token,
    method: 'delete',
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [CREATVIEW]: creatView(api.path.view()),
  [EDITVIEW]: editView,
  [DUPLIACTEVIEW]: creatView(api.path.copyView),
  [DELETEVIEW]: deleteView,
});
