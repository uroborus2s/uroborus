import {
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import { pureDispatcher, validator } from '../core';
import {
  CREATROW,
  CREATVIEW,
  DUPLIACTEVIEW,
  EDITVIEW,
  READTABLE,
  READVIEW,
} from '../domain.command';
import {
  ColumnViewRsp,
  CommandOptions,
  RowViewRsp,
  ViewData,
  ViewRsp,
  ViewSchemaType,
} from '../types';
import { column } from '@/domain/column/column.repository';

export const view = (function () {
  class c {
    readonly name: (viewId: string) => RecoilState<string>;
    readonly desc: (viewId: string) => RecoilState<string>;
    readonly type: (viewId: string) => RecoilState<ViewSchemaType>;
    readonly views: (viewIds: string[]) => RecoilValueReadOnly<ViewData[]>;
    readonly columnOrders: (viewId: string) => RecoilState<Set<string>>;
    readonly columnWidth: (columnId: string) => RecoilState<number>;
    readonly columnFrozen: (columnId: string) => RecoilState<number>;
    readonly frozenWidth: (viewId: string) => RecoilValueReadOnly<number>;
    readonly noFrozenColWidth: (viewId: string) => RecoilValueReadOnly<number>;
    readonly colWidths: (viewId: string) => RecoilValueReadOnly<number>;

    readonly frozenIndex: (viewId: string) => RecoilValueReadOnly<number>;
    readonly rowOrders: (viewId: string) => RecoilState<Set<string>>;
    readonly rowsSize: (viewId: string) => RecoilValueReadOnly<number>;

    constructor() {
      this.name = atomFamily<string, string>({
        key: 'view/name',
        default: '',
      });

      this.desc = atomFamily<string, string>({
        key: 'view/desc',
        default: '',
      });

      this.type = atomFamily<ViewSchemaType, string>({
        key: 'view/type',
        default: 'grid',
      });

      this.views = selectorFamily({
        key: 'view/views',
        get:
          (ids: string[]) =>
          ({ get }) =>
            ids.map((id) => ({
              id: id,
              name: get(this.name(id)),
              type: get(this.type(id)),
            })),
      });

      this.columnOrders = atomFamily({
        key: 'view/colunmIds',
        default: new Set(),
      });

      this.columnWidth = atomFamily({
        key: 'view/columnWidth',
        default: 0,
      });

      this.columnFrozen = atomFamily({
        key: 'view/columnFrozen',
        default: 0,
      });

      this.frozenWidth = selectorFamily({
        key: 'view/frozenWidth',
        get:
          (viewId) =>
          ({ get }) => {
            const colIds = [...get(this.columnOrders(viewId))];
            const endIndex = get(this.frozenIndex(viewId));

            return colIds
              .slice(0, endIndex)
              .reduce(
                (width, colId) => width + get(this.columnWidth(colId)),
                0,
              );
          },
      });

      this.noFrozenColWidth = selectorFamily({
        key: 'view/noFrozenColWidth',
        get:
          (viewId) =>
          ({ get }) => {
            const colIds = [...get(this.columnOrders(viewId))];
            const startIndex = get(this.frozenIndex(viewId));
            return colIds
              .slice(startIndex, colIds.length)
              .reduce(
                (width, colId) => width + get(this.columnWidth(colId)),
                0,
              );
          },
      });

      this.colWidths = selectorFamily({
        key: 'view/colWidths',
        get:
          (viewId) =>
          ({ get }) => {
            const colIds = [...get(this.columnOrders(viewId))];
            return colIds.reduce(
              (width, colId) => width + get(this.columnWidth(colId)),
              0,
            );
          },
      });

      this.frozenIndex = selectorFamily({
        key: 'view/frozenIndex',
        get:
          (viewId) =>
          ({ get }) => {
            const colIds = [...get(this.columnOrders(viewId))];
            return colIds.findIndex(
              (id) =>
                get(this.columnFrozen(id)) === 0 && !get(column.primary(id)),
            );
          },
      });

      this.rowOrders = atomFamily({
        key: 'view/rowOrders',
        default: new Set(),
      });

      this.rowsSize = selectorFamily({
        key: 'view/rowsSize',
        get:
          (viewId) =>
          ({ get }) =>
            get(this.rowOrders(viewId)).size,
      });
    }
  }

  return new c();
})();

function writeViews(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const views = options.response.views || options.response.data;

  if (views) {
    if (validator(views)) {
      views.forEach((v: ViewRsp) => {
        const { id, name, desc, type } = v;
        if (id) {
          if (name) set(view.name(id), name);
          if (desc) set(view.desc(id), desc);
          if (type) set(view.type(id), type);
        }
      });
    }
  }
}

function editView(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  const commandType = options.name;
  const id = options.request?.path?.id;
  const len = options.response ? Object.keys(options.response).length : 0;

  const { name, desc, type, view_columns, view_rows } =
    len > 0
      ? options.response
      : options.request
      ? options.request.data
      : undefined;
  if (id) {
    if (name) set(view.name(id), name);
    if (desc) set(view.desc(id), desc);
    if (type) set(view.type(id), type);
    if (commandType === READVIEW) {
      if (view_columns) {
        const cols: string[] = [];
        if (view_columns.length > 1)
          view_columns.sort(
            (a: ColumnViewRsp, b: ColumnViewRsp) => a.order - b.order,
          );

        view_columns.forEach((col: ColumnViewRsp) => {
          const { column_id, width, frozen } = col;
          cols.push(column_id);
          if (width) set(view.columnWidth(column_id), width);
          if (frozen) set(view.columnFrozen(column_id), frozen);
        });
        set(view.columnOrders(id), new Set(cols));
      }
      if (view_rows) {
        if (view_rows.length > 1)
          view_rows.sort((a: RowViewRsp, b: RowViewRsp) => a.order - b.order);
        set(
          view.rowOrders(id),
          new Set(view_rows.map((r: RowViewRsp) => r.row_id)),
        );
      }
    }
  }
}

function newBlankRow(
  { set }: TransactionInterface_UNSTABLE,
  options: CommandOptions,
) {
  console.log(options);
  const newRowId = options.response.id;
  const viewId = options.request?.data?.view_id;
  set(view.rowOrders(viewId), (prev) => new Set([...prev, newRowId]));
}

export default pureDispatcher({
  [READTABLE]: writeViews,
  [CREATVIEW]: writeViews,
  [EDITVIEW]: editView,
  [DUPLIACTEVIEW]: writeViews,
  [READVIEW]: editView,
  [CREATROW]: newBlankRow,
});
