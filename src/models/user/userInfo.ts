import { atom } from 'recoil';
import { UserAccountMode } from '../types';

//当前登录用户账号ID
//通过接口数据的 sessionUserId 字段获取
export const CurrentUserLongin = atom({
  key: 'currentUserLongin',
  default: '',
});

//登录用户的账号组信息
//通过接口数据的  rawUsers 字段获取
export const UserAccountsInfo = atom({
  key: 'userAccountsInfo',
  default: new Map<string, UserAccountMode>(),
});
