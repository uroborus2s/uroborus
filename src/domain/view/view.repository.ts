import {
  atomFamily,
  RecoilState,
  RecoilValueReadOnly,
  selectorFamily,
  TransactionInterface_UNSTABLE,
} from 'recoil';
import { column as columnEntity } from '../column/column.repository';
import { pureDispatcher, validator } from '../core';
import {
  CREATVIEW,
  DUPLIACTEVIEW,
  EDITVIEW,
  READTABLE,
  READVIEW,
} from '../domain.command';
import { row as rowEntity } from '../row/row.repository';
import {
  ColumnDataTemplate,
  ColumnViewRsp,
  CommandOptions,
  RowViewRsp,
  ViewData,
  ViewRsp,
  ViewSchemaType,
} from '../types';

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
    readonly rowOrders: (viewId: string) => RecoilState<Set<string>>;
    readonly frozenIndex: (viewId: string) => RecoilValueReadOnly<number>;

    readonly rowData: (
      viewId: string,
    ) => RecoilValueReadOnly<Array<Record<string, any>>>;

    readonly columnData: (
      viewId: string,
    ) => RecoilValueReadOnly<Array<ColumnDataTemplate>>;

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
            const endIndex = colIds.findIndex(
              (id) => get(this.columnFrozen(id)) === 0,
            );

            return colIds
              .slice(0, endIndex)
              .map((colId) => get(this.columnWidth(colId)))
              .reduce((pre, current) => pre + current, 0);
          },
      });

      this.frozenIndex = selectorFamily({
        key: 'view/frozenIndex',
        get:
          (viewId) =>
          ({ get }) => {
            const colIds = [...get(this.columnOrders(viewId))];
            return colIds.findIndex((id) => get(this.columnFrozen(id)) === 0);
          },
      });

      this.rowOrders = atomFamily({
        key: 'view/rowOrders',
        default: new Set(),
      });

      this.rowData = selectorFamily({
        key: 'view/rowData',
        get:
          (viewId) =>
          ({ get }) => {
            const rowIds = [...get(this.rowOrders(viewId))];
            return rowIds.map((rId) => {
              const colIds = get(rowEntity.columnIds(rId));
              const oneRowData: Record<string, any> = {};
              colIds.forEach((cId) => {
                oneRowData[get(columnEntity.name(cId))] = get(
                  rowEntity.cellValue(cId),
                );
              });
              return oneRowData;
            });
          },
      });

      this.columnData = selectorFamily({
        key: 'view/columnData',
        get:
          (viewId) =>
          ({ get }) => {
            let offset = 65;
            const colIds = [...get(this.columnOrders(viewId))];
            return colIds.map((colId, index) => {
              const currentWidth = get(this.columnWidth(colId));
              let prveWidth = 0;
              if (index > 0) {
                prveWidth = get(this.columnWidth(colIds[index - 1]));
              }
              offset += prveWidth;
              return {
                name: get(columnEntity.name(colId)),
                type: get(columnEntity.type(colId)),
                id: colId,
                width: currentWidth,
                offset: offset,
                option: get(columnEntity.options(colId)),
              };
            });
          },
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
    len > 0 ? options.response : options.request?.data;
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

export default pureDispatcher({
  [READTABLE]: writeViews,
  [CREATVIEW]: writeViews,
  [EDITVIEW]: editView,
  [DUPLIACTEVIEW]: writeViews,
  [READVIEW]: editView,
});
