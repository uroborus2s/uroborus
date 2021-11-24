import { api, CREATROW } from '@/domain';
import { cmdDispatcher, transformResponse } from '@/domain/core';
import request from '@/domain/request/request';
import { CommandOptions } from '@/domain/types';

const newRow = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.newRow, {
    cancelToken: options.token,
    method: 'post',
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [CREATROW]: newRow,
});
