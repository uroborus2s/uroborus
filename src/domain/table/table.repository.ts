import {
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import { calcSort, pureDispatcher, validator } from '../core';
import {
  CREATTABLE,
  CREATTABLEBYFILE,
  CREATVIEW,
  DELETEVIEW,
  DUPLIACTETABLE,
  DUPLIACTEVIEW,
  EDITTABLE,
  READBASE,
  READTABLE,
} from '../domain.command';
import { CommandOptions, TableRsp } from '../types';

export const table = (function () {
  class c {
    readonly name: (param: string) => RecoilState<string>;
    readonly desc: (param: string) => RecoilState<string>;
    readonly lastUsedViewId: (param: string) => RecoilState<string>;
    readonly viewIds: (param: string) => RecoilState<Set<string>>;

    readonly allTables: (
      param: string[],
    ) => RecoilValueReadOnly<{ name: string; id: string }[]>;

    constructor() {
      this.name = atomFamily<string, string>({
        key: 'table/name',
        default: '',
      });

      this.desc = atomFamily<string, string>({
        key: 'table/desc',
        default: '',
      });

      this.lastUsedViewId = atomFamily<string, string>({
        key: 'table/lastUsedViewId',
        default: '',
      });

      this.viewIds = atomFamily<Set<string>, string>({
        key: 'table/viewIds',
        default: new Set(),
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
  tran: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  if (options.response && options.response.tables) {
    const tables = options.response.tables;
    if (validator(tables)) {
      tables.forEach((t: TableRsp) => {
        write(tran, t.id, t);
      });
    }
  }
}

function edit({ set }: TransactionInterface_UNSTABLE, options: CommandOptions) {
  const len = options.response ? Object.keys(options.response).length : 0;
  if (len >= 0) {
    const { name, desc } = (
      len > 0 ? options.response : options.request?.data
    ) as TableRsp;
    const id = options.request?.path?.id;
    if (id) {
      if (name) set(table.name(id), name);
      if (desc) set(table.desc(id), desc);
    }
  }
}

function writeOneTable(
  tran: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  if (options.response) {
    const id = options.request?.path?.id;
    write(tran, id, options.response);
  }
}

function write(
  { set }: TransactionInterface_UNSTABLE,
  id: string,
  tableRsp: TableRsp,
) {
  const { name, desc, selected_view_id, views } = tableRsp;
  if (id) {
    if (name) set(table.name(id), name);
    if (desc) set(table.desc(id), desc);
    if (selected_view_id) set(table.lastUsedViewId(id), selected_view_id);
    if (views) {
      set(table.viewIds(id), new Set(calcSort(views)));
    }
  }
}

function writeViewIds(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const views = options.response.data;
  const id = options.request?.params?.tableId;
  if (id && views) {
    set(table.viewIds(id), new Set(calcSort(views)));
  }
}
function deleteOneViewById(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const tableId = options.request?.path?.tableId;
  const id = options.request?.path?.id;
  if (tableId && id)
    set(table.viewIds(tableId), (ids) => {
      ids.delete(id);
      return new Set([...ids]);
    });
}

export default pureDispatcher({
  [READTABLE]: writeOneTable,
  [READBASE]: writeTables,
  [CREATTABLE]: writeTables,
  [CREATTABLEBYFILE]: writeTables,
  [EDITTABLE]: edit,
  //拷贝表格，1、请求api，2、获取所有表格，3、写入表格数据，4、写入base里的tableIds数据
  [DUPLIACTETABLE]: writeTables,
  [CREATVIEW]: writeViewIds,
  [DUPLIACTEVIEW]: writeViewIds,
  [DELETEVIEW]: deleteOneViewById,
});
