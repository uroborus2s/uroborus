import { base, EDITTABLE } from '@/domain';
import { CREATTABLE, CREATTABLEBYFILE, READBASE } from '../domain.command';
import { CommandOptions, TableRsp } from '../types';
import {
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import { calcSort, pureDispatcher, validator } from '../core';

export const table = (function () {
  class c {
    readonly name: (param: string) => RecoilState<string>;

    readonly allTables: (
      param: string[],
    ) => RecoilValueReadOnly<{ name: string; id: string }[]>;

    constructor() {
      this.name = atomFamily<string, string>({
        key: 'table/name',
        default: '',
      });

      this.allTables = selectorFamily({
        key: 'table/all',
        get:
          (ids: string[]) =>
          ({ get }) =>
            ids.map((id) => ({ id: id, name: get(this.name(id)) })),
      });
    }
  }

  return new c();
})();

function writeTables(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  if (options.response && options.response.tables) {
    const tables = options.response.tables;
    if (validator(tables)) {
      tables.forEach((t: TableRsp) => {
        set(table.name(t.id), t.name);
      });
    }
  }
}

function edit({ set }: TransactionInterface_UNSTABLE, options: CommandOptions) {
  const len = options.response ? Object.keys(options.response).length : 0;
  console.log('修改table名称', options);
  if (len >= 0) {
    const { name } = len > 0 ? options.response : options.request?.data;
    const id = options.request?.path?.id;
    if (name) set(table.name(id), name);
  }
}

export default pureDispatcher({
  [READBASE]: writeTables,
  [CREATTABLE]: writeTables,
  [CREATTABLEBYFILE]: writeTables,
  [EDITTABLE]: edit,
});
