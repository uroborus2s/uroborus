import { USERINFO } from '../domain.command';
import { CommandOptions } from '../types';
import { TransactionInterface_UNSTABLE } from 'recoil';
import { pureDispatcher } from '../core';

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
