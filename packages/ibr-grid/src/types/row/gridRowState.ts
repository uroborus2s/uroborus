import { GridRowId, GridRowModel, GridRowNode } from './gridRows';

export type GridRowsLookup = Record<GridRowId, GridRowModel>;

export interface GridRowTreeCreationValue {
  /**
   * Name of the algorithm used to group the rows
   * It is useful to decide which filtering / sorting algorithm to apply, to avoid applying tree-data filtering on a grouping-by-column dataset for instance.
   */
  groupingName: string;
  tree: GridRowNode;
  treeDepth: number;
  ids: GridRowId[];
  idRowsLookup: GridRowsLookup;
}

export interface GridRowsState extends GridRowTreeCreationValue {
  /**
   * 应用筛选的行数
   * 包含展开和折叠的子行
   */
  totalRowCount: number;
  /**
   * 应用筛选的行数
   * 不计算展开和折叠的子行
   */
  totalTopLevelRowCount: number;
}
