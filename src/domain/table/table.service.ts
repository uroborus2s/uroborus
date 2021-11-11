import {
  api,
  cmdDispatcher,
  CommandOptions,
  CREATTABLE,
  CREATTABLEBYFILE,
  DataResponse,
  NullResponseError,
  request,
  ResponseCode,
  ServiceCodeError,
} from '@/domain';

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

export default cmdDispatcher({
  [CREATTABLE]: creatTable(api.path.table()),
  [CREATTABLEBYFILE]: creatTable(api.path.uploadTable),
});
