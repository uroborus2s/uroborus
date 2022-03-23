import { api, LOGIN, LOGOUT, USERINFO } from '../domain.command';
import request from '../request/request';
import { CommandOptions } from '../types';
import { cmdDispatcher, transformResponse } from '../core';

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
