import { atom, TransactionInterface_UNSTABLE } from 'recoil';
import { pureDispatcher } from '../core';
import { CommandOptions, LOGIN, LOGOUT, USERINFO } from '../index';

function readUser(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  if (options.dispatch) {
    options.dispatch({ ...options.response });
  }
}

export default pureDispatcher({
  [USERINFO]: readUser,
});
