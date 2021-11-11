import {
  api,
  cmdDispatcher,
  CommandOptions,
  DataResponse,
  LOGIN,
  LOGOUT,
  NullResponseError,
  request,
  ResponseCode,
  ServiceCodeError,
  transformResponse,
  USERINFO,
} from '../index';

const login = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.login, {
    cancelToken: options.token,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: { ...options.request?.data },
  });
  delete options['request'];
  return transformResponse(options, err, res);
};

const logout = async function (options: CommandOptions) {
  const [err, res] = await request(api.path.logout, {
    cancelToken: options.token,
    method: 'post',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    data: { ...options.request?.data },
  });
  return transformResponse(options, err, res);
};

const getUser = async function (options: CommandOptions) {
  const [err, userInfoRes] = await request(api.path.userInfo, {
    cancelToken: options.token,
  });
  return transformResponse(options, err, userInfoRes);
};

export default cmdDispatcher({
  [LOGIN]: login,
  [LOGOUT]: logout,
  [USERINFO]: getUser,
});
