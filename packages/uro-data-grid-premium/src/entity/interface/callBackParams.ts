import { HeaderPosition } from '@/hooks/useHeaderPosition';
import { CellPosition } from '@/hooks/useCellPosition';
import { GridApi } from '@/entity/types/gridApi';
import { Column } from '../column';
import { RowNode } from '../rowNode';
import { GridCommon } from './common';
import { ChartMenuOptions } from './chartOptions';
import { ServerSideTransaction } from './serverSideTransaction';

export interface GetGroupAggFilteringParams extends GridCommon {
  api: GridApi;
}

export interface PostProcessPopupParams extends GridCommon {
  /** If popup is for a column, this gives the Column */
  column?: Column | null;
  /** If popup is for a row, this gives the RowNode */
  rowNode?: RowNode | null;
  /** The popup we are showing */
  ePopup: HTMLElement;
  /** The different types are:
   *  'contextMenu', 'columnMenu', 'aggFuncSelect', 'popupCellEditor' */
  type: string;
  /** If the popup is as a result of a button click (eg menu button),
   *  this is the component that the user clicked */
  eventSource?: HTMLElement | null;
  /** If the popup is as a result of a click or touch,
   *  this is the event - eg user showing context menu */
  mouseEvent?: MouseEvent | Touch | null;
}

export interface ProcessCellForExportParams extends GridCommon {
  value: any;
  accumulatedRowIndex?: number;
  node?: RowNode | null;
  column: Column;
  type: string; // clipboard, dragCopy (ctrl+D), export
}

export interface SendToClipboardParams extends GridCommon {
  data: string;
}

export interface ProcessDataFromClipboardParams extends GridCommon {
  /** 2D array of all cells from the clipboard */
  data: string[][];
}

export type IsExternalFilterPresentParams = GridCommon;

export interface GetChartToolbarItemsParams extends GridCommon {
  defaultItems?: ChartMenuOptions[];
}

export interface NavigateToNextHeaderParams extends GridCommon {
  /** The key for the arrow key pressed,
   *  left = 'ArrowLeft', up = 'ArrowUp', right = 'ArrowRight', down = 'ArrowDown' */
  key: string;
  /** The header that currently has focus */
  previousHeaderPosition: HeaderPosition | null;
  /** The header the grid would normally pick as the next header for this navigation */
  nextHeaderPosition: HeaderPosition | null;
  /** The number of header rows present in the grid */
  headerRowCount: number;
  event: KeyboardEvent;
}

export interface TabToNextHeaderParams extends GridCommon {
  /** True if the Shift key is also down */
  backwards: boolean;
  /** The header that currently has focus */
  previousHeaderPosition: HeaderPosition | null;
  /** The header the grid would normally pick as the next header for this navigation */
  nextHeaderPosition: HeaderPosition | null;
  /** The number of header rows present in the grid */
  headerRowCount: number;
}

export interface NavigateToNextCellParams extends GridCommon {
  /** The keycode for the arrow key pressed:
   *  left = 'ArrowLeft', up = 'ArrowUp', right = 'ArrowRight', down = 'ArrowDown' */
  key: string;
  /** The cell that currently has focus */
  previousCellPosition: CellPosition;
  /** The cell the grid would normally pick as the next cell for navigation */
  nextCellPosition: CellPosition | null;

  event: KeyboardEvent | null;
}

export interface TabToNextCellParams extends GridCommon {
  /** True if the Shift key is also down */
  backwards: boolean;
  /** True if the current cell is editing
   * (you may want to skip cells that are not editable, as the grid will enter the next cell in editing mode also if tabbing) */
  editing: boolean;
  /** The cell that currently has focus */
  previousCellPosition: CellPosition;
  /** The cell the grid would normally pick as the next cell for navigation.  */
  nextCellPosition: CellPosition | null;
}

export interface GetLocaleTextParams extends GridCommon {
  key: string;
  defaultValue: string;
  variableValues?: string[];
}

export interface PaginationNumberFormatterParams extends GridCommon {
  value: number;
}

export interface GetGroupRowAggParams extends GridCommon {
  nodes: RowNode[];
}

export interface IsGroupOpenByDefaultParams extends GridCommon {
  /** The row node being considered. */
  rowNode: RowNode;
  /** The Column for which this row is grouping. */
  rowGroupColumn: Column;
  /** Same as `rowNode.level` - what level the group is at, e.g. 0 for top level, 1 for second etc */
  level: number;
  /** Same as `rowNode.field` - the field we are grouping on, e.g. 'country' */
  field: string;
  /** Same as `rowNode.key`, the value of this group, e.g. 'Ireland' */
  key: string;
}

export interface InitialGroupOrderComparatorParams extends GridCommon {
  nodeA: RowNode;
  nodeB: RowNode;
}

export interface GetServerSideGroupLevelParamsParams extends GridCommon {
  /** The level of the store. Top level is 0. */
  level: number;
  /** The Row Node for the group that got expanded, or undefined if top level (ie no parent) */
  parentRowNode?: RowNode;
  /** Active Row Group Columns, if any. */
  rowGroupColumns: Column[];
  /** Active Pivot Columns, if any. */
  pivotColumns: Column[];
  /** true if pivot mode is active. */
  pivotMode: boolean;
}

export interface IsServerSideGroupOpenByDefaultParams extends GridCommon {
  data: any;
  rowNode: RowNode;
}

export interface IsApplyServerSideTransactionParams extends GridCommon {
  /** The transaction getting applied. */
  transaction: ServerSideTransaction;
  /** The parent RowNode, if transaction is applied to a group. */
  parentNode: RowNode;
  /** @deprecated use groupLevelInfo instead */
  storeInfo: any;
  /** Store info, if any, as passed via the success() callback when loading data. */
  groupLevelInfo: any;
}

export interface GetRowIdParams extends GridCommon {
  /** The data item provided to the grid for the row in question */
  data: any;
  /** If grouping, the level, ie how many levels from the top. Used by ServerSide Row Model only */
  level: number;
  /** If grouping, provides the keys of the parent groups. Used by ServerSide Row Model only */
  parentKeys?: string[];
}

export interface ProcessRowParams extends GridCommon {
  eRow: HTMLElement;
  ePinnedLeftRow: HTMLElement;
  ePinnedRightRow: HTMLElement;
  rowIndex: number;
  node: RowNode;
  addRenderedRowListener: (
    eventType: string,
    listener: (args: any) => any,
  ) => void;
}

export interface FillOperationParams extends GridCommon {
  /** The mouse event for the fill operation. */
  event: MouseEvent;
  /** The values that have been processed by the fill operation. */
  values: any[];
  /** The RowNode of the current cell being changed. */
  rowNode: RowNode;
  /** The Column of the current cell being changed. */
  column: Column;
  /** The values that were present before processing started. */
  initialValues: any[];
  /** The index of the current processed value. */
  currentIndex: number;
  /** The value of the cell being currently processed by the Fill Operation. */
  currentCellValue: any;
  /** The direction of the Fill Operation. */
  direction: 'up' | 'down' | 'left' | 'right';
}

export interface PostSortRowsParams extends GridCommon {
  nodes: RowNode[];
}

export interface RowHeightParams extends GridCommon {
  /** The data associated with this row from rowData. Data is `undefined` for row groups. */
  data: any | undefined;
  /** The RowNode of the row in question. */
  node: RowNode;
}

export interface IsFullWidthRowParams extends GridCommon {
  rowNode: RowNode;
}
