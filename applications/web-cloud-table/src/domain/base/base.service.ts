import {
  api,
  CREATBASE,
  CREATBASEBYFILE,
  DELETEBASE,
  DUPLIACTEBASE,
  EDITBASE,
  MOVEBASE,
  READBASE,
} from '../domain.command';
import { NullResponseError } from '../error';
import { ServiceCodeError } from '../request/error';
import request, { ResponseCode } from '../request/request';
import { BaseRsp, CommandOptions, DataResponse } from '../types';
import { cmdDispatcher, transformResponse } from '../core';

const creatBase = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.base(), {
    cancelToken: options.token,
    method: 'post',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

const creatBaseByFile = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.uploadBase, {
    cancelToken: options.token,
    method: 'post',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

const editBase = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.base(options.request?.path?.id), {
    cancelToken: options.token,
    method: 'put',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

const dupliacteBase = async function (options: CommandOptions) {
  const [err, res] = await request(
    api.path.copyBase(options.request?.path?.id),
    {
      cancelToken: options.token,
      method: 'post',
      data: { ...options.request?.data },
    },
  );
  return transformResponse(options, err, res);
};

const moveBase = async function (options: CommandOptions) {
  const [err, res] = await request(
    api.path.moveBase(options.request?.path?.id),
    {
      cancelToken: options.token,
      method: 'put',
      data: { ...options.request?.data },
    },
  );
  return transformResponse(options, err, res);
};

const deleteBase = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.base(options.request?.path?.id), {
    cancelToken: options.token,
    method: 'delete',
  });
  return transformResponse(options, err, res);
};

const readBaseById = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.base(options.request?.path?.id), {
    cancelToken: options.token,
  });
  if (err != null) return Promise.reject(err);
  if (res) {
    const { data, code } = res.data as DataResponse<BaseRsp>;
    if (code == ResponseCode.Failure)
      return Promise.reject(new ServiceCodeError(code));
    return { ...options, response: { ...data } };
  }
  return Promise.reject(new NullResponseError());
};

export default cmdDispatcher({
  [EDITBASE]: editBase,
  [DUPLIACTEBASE]: dupliacteBase,
  [MOVEBASE]: moveBase,
  [DELETEBASE]: deleteBase,
  [CREATBASEBYFILE]: creatBaseByFile,
  [CREATBASE]: creatBase,
  [READBASE]: readBaseById,
});
