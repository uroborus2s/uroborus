import { cmdDispatcher, transformResponse } from '@/domain/core';
import request from '@/domain/request/request';
import { CommandOptions } from '@/domain/types';
import { api, CREATCOLUMN } from '../domain.command';

const newColumn = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.column(), {
    cancelToken: options.token,
    method: 'post',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [CREATCOLUMN]: newColumn,
});
