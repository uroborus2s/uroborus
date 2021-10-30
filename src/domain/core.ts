import { ServiceCodeError } from '@/domain/request/error';
import { ResponseCode } from '@/domain/request/request';
import {
  CommandFun,
  CommandOptions,
  DataResponse,
  DataRsep,
  PureFun,
  ReduceFun,
} from './types';
import { CancelToken } from 'axios';
import { TransactionInterface_UNSTABLE } from 'recoil';
import { NoTokenError, NullResponseError } from './error';

export function cmdDispatcher(cmds: Record<string, CommandFun>): CommandFun {
  return (options: CommandOptions) => {
    if (cmds[options.name]) return cmds[options.name](options);

    return Promise.resolve(options);
  };
}

export const promiseWithCancelToken =
  (token: CancelToken) =>
  (config: CommandOptions): Promise<CommandOptions> => {
    const c = config || {};
    if (!token) {
      console.log('token 不存在！参数错误');
      return Promise.reject(new NoTokenError());
    }
    return Promise.resolve({ ...c, token });
  };

export function pureDispatcher(reducers: Record<string, PureFun>): ReduceFun {
  return (inter: TransactionInterface_UNSTABLE, options: CommandOptions) => {
    if (reducers[options.name]) reducers[options.name](inter, options);

    return [inter, options];
  };
}

export function validator(data: any): boolean {
  return !!(
    Array.isArray(data) &&
    data.every(
      (d) => typeof d.id === 'string' && d.id && typeof d.order === 'number',
    )
  );
}

export function calcSort(data: DataRsep[] | null | undefined): string[] {
  if (data && validator(data)) {
    if (data.length > 1) data.sort((a, b) => a.order - b.order);
    return data.map((d) => d.id);
  }
  return [];
}

export function promiseWithError<T, U = any>(
  promise: Promise<T>,
): Promise<[U | null, T | null]> {
  return promise
    .then<[null, T]>((data: T) => [null, data])
    .catch<[U, null]>((err) => [err, null]);
}

export function transformResponse(options: CommandOptions, err: any, res: any) {
  if (err != null) return Promise.reject(err);
  if (res) {
    const { code } = res.data as DataResponse;
    if (code == ResponseCode.Failure)
      return Promise.reject(new ServiceCodeError(code));
    return Promise.resolve({
      ...options,
      response: { id: options.request?.path?.id, ...options.request?.data },
    });
  }
  return Promise.reject(new NullResponseError());
}
