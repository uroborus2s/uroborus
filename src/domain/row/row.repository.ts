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
      if (id && typeof cols == 'object') {
        Object.keys(cols).forEach((cId) => {
          const cellId = (id as string).concat('/', cId);
          set(row.cellValue(cellId), cols[cId]);
        });
      }
    });
  }
}

function wirteCellByNewRow(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const contents = options.request?.data?.contents;
  const newRowId = options.response.id;
  Object.entries(contents).forEach(([colId, cellValue]) => {
    const cellId = (newRowId as string).concat('/', colId);
    set(row.cellValue(cellId), cellValue);
  });
}

export default pureDispatcher({
  [READTABLE]: wirteColumnIdsOfRow,
  [CREATROW]: wirteCellByNewRow,
});
