import { CREATROW, READTABLE } from '../domain.command';
import { pureDispatcher } from '../core';
import { CommandOptions } from '../types';
import { atomFamily, RecoilState, TransactionInterface_UNSTABLE } from 'recoil';

export const row = (function () {
  class c {
    readonly cellValue: (cellId: string) => RecoilState<any>;

    constructor() {
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
        Object.keys(cols).forEach((cId) => {
          const cellId = (id as string).concat('/', cId);
          set(row.cellValue(cellId), cols[cId]);
        });
      }
    });
  }
}

export default pureDispatcher({
  [READTABLE]: wirteColumnIdsOfRow,
});
