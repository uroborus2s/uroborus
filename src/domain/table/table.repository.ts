import {
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import { pureDispatcher, validator } from '../core';
import {
  CommandOptions,
  CREATTABLE,
  CREATTABLEBYFILE,
  READBASE,
  TableRsp,
} from '../index';

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

export default pureDispatcher({
  [READBASE]: writeTables,
  [CREATTABLE]: writeTables,
  [CREATTABLEBYFILE]: writeTables,
});
