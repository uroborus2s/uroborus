import { READTABLE } from '@/domain';
import { pureDispatcher } from '@/domain/core';
import { CommandOptions } from '@/domain/types';
import { atomFamily, RecoilState, TransactionInterface_UNSTABLE } from 'recoil';

export const row = (function () {
  class c {
    readonly columnIds: (rowId: string) => RecoilState<string[]>;
    readonly cellValue: (columnId: string) => RecoilState<any>;

    constructor() {
      this.columnIds = atomFamily<string[], string>({
        key: 'row/columnIds',
        default: [],
      });

      this.cellValue = atomFamily({
        key: 'row/cell',
        default: undefined,
      });
    }
  }

  return new c();
})();

function wirteColumnIdsOfRow(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const { rows } = options.response;

  if (rows && Array.isArray(rows)) {
    rows.forEach((r) => {
      const { id, ...cols } = r;
      console.log(cols);
      if (id && typeof cols == 'object') {
        console.log('保存值', Object.keys(cols));
        const cIds = Object.keys(cols);
        set(row.columnIds(id), cIds);
        cIds.forEach((cId) => {
          set(row.cellValue(cId), cols[cId]);
        });
      }
    });
  }
}

export default pureDispatcher({
  [READTABLE]: wirteColumnIdsOfRow,
});
