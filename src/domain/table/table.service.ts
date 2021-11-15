import {
  api,
  CREATTABLE,
  CREATTABLEBYFILE,
  DELETETABLE,
  DUPLIACTETABLE,
  EDITTABLE,
  READTABLE,
} from '../domain.command';
import { NullResponseError } from '../error';
import { ServiceCodeError } from '../request/error';
import request, { ResponseCode } from '../request/request';
import { CommandOptions, DataResponse, TableRsp } from '../types';
import { cmdDispatcher, transformResponse } from '../core';

const readTable = async function (options: CommandOptions) {
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

const readAllTables = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.table(), {
    cancelToken: options.token,
    params: { base_id: options.request?.params?.baseId },
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

const creatTable = (url: string | ((id: string) => string)) =>
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
      const { code, data } = res.data;
      if (code == ResponseCode.Failure)
        return Promise.reject(new ServiceCodeError(code));
      const reqest = options.request || {};
      reqest['params'] = reqest.params || {};
      reqest.params['baseId'] = options.request?.data?.base_id;
      reqest.params['tableId'] = data.id;
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

const deleteTable = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.table(options.request?.path?.id), {
    cancelToken: options.token,
    method: 'delete',
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [CREATTABLE]: creatTable(api.path.table()),
  [CREATTABLEBYFILE]: creatTable(api.path.uploadTable),
  [EDITTABLE]: editTable,
  [READTABLE]: readTable,
  [DELETETABLE]: deleteTable,
  //拷贝表格，1、请求api，2、获取所有表格，3、写入表格数据，4、写入base里的tableIds数据
  [DUPLIACTETABLE]: creatTable(api.path.copyTable),
});
