import {
  api,
  cmdDispatcher,
  CommandOptions,
  LOGIN,
  request,
  transformResponse,
} from '../index';

const login = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.login(), {
    cancelToken: options.token,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

export default cmdDispatcher({
  [LOGIN]: login,
});
