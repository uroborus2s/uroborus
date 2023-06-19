import { GridValidRowModel } from '../porps/gridRowProps.js';

import { ColumnApi } from './columnApi.js';
import { GridApi } from './gridApi.js';

/**
 * 启用给定类型的类型安全创建，而无需设置将与集中位置的对象合并的公共网格属性。
 */
export type WithoutGridCommon<T extends GridCommon> = Omit<T, keyof GridCommon>;

export interface GridCommon<
  TData extends GridValidRowModel = GridValidRowModel,
> {
  /** The grid api. */
  api: GridApi<TData>;
  /** The column api. */
  columnApi: ColumnApi;
}
