import {
  api,
  cmdDispatcher,
  CommandOptions,
  DELETEBASE,
  DUPLIACTEBASE,
  EDITBASE,
  MOVEBASE,
  request,
  transformResponse,
} from '../index';

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

export default cmdDispatcher({
  [EDITBASE]: editBase,
  [DUPLIACTEBASE]: dupliacteBase,
  [MOVEBASE]: moveBase,
  [DELETEBASE]: deleteBase,
});
