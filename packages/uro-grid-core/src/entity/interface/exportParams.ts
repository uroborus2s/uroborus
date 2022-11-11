import { Column } from '../column';
import { RowPosition } from './rowPosition';
import { RowNode } from '../rowNode';
import { GridCommon } from './common';
import { ColumnGroup } from '../columnGroup';

export interface ShouldRowBeSkippedParams {
  /** Row node. */
  node: RowNode;
}

export interface ProcessCellForExportParams extends GridCommon {
  value: any;
  accumulatedRowIndex?: number;
  node?: RowNode | null;
  column: Column;
  type: string; // clipboard, dragCopy (ctrl+D), export
}

export interface ProcessHeaderForExportParam extends GridCommon {
  column: Column;
}

export interface ProcessHeaderForExportParams extends GridCommon {
  column: Column;
}

export interface ProcessGroupHeaderForExportParams extends GridCommon {
  columnGroup: ColumnGroup;
}

export interface ProcessRowGroupForExportParams extends GridCommon {
  /** Row node. */
  node: RowNode;
}

export interface BaseExportParams {
  /**
   * 如果为`true`，则所有列都将按照它们在ColumnDefs中的出现顺序导出。
   * 如果为`False`，则只会导出当前显示的列。
   * Default: `false`
   */
  allColumns?: boolean;
  /**
   * Provide a list (an array) of column keys or Column objects if you want to export specific columns.
   */
  columnKeys?: (string | Column)[];
  /** 行节点位置。 */
  rowPositions?: RowPosition[];
  /**
   * 文件名名称
   */
  fileName?: string;
  /**
   * 仅导出选定行。
   * Default: `false`
   */
  onlySelected?: boolean;
  /**
   * 仅导出包括其他页面的选定行(仅在使用分页时才有作用)。
   * Default: `false`
   */
  onlySelectedAllPages?: boolean;

  /**
   * 设置为`true`则排除表头列组。
   * Default: `false`
   */
  skipColumnGroupHeaders?: boolean;
  /**
   * 如果不想导出列标题，则设置为`true`。
   * Default: `false`
   */
  skipColumnHeaders?: boolean;
  /**
   * 设置为`true`可在对行进行分组时跳过行组标题。仅在对行进行分组时才相关。
   * Default: `false`
   */
  skipRowGroups?: boolean;
  /**
   * 设置为`true`以禁止导出固定在网格顶部的行。
   * Default: `false`
   */
  skipPinnedTop?: boolean;
  /**
   * 设置为`true`以禁止导出固定在网格底部的行。
   * Default: `false`
   */
  skipPinnedBottom?: boolean;

  /**
   * 回调函数-返回TRUE将从导出中省略该行
   */
  shouldRowBeSkipped?(params: ShouldRowBeSkippedParams): boolean;
  /**
   * 回调函数，返回要在导出中显示的字符串值。
   */
  processCellCallback?(params: ProcessCellForExportParams): string;
  /**
   * 回调函数。返回要在列标题中显示的字符串
   */
  processHeaderCallback?(params: ProcessHeaderForExportParams): string;
  /**
   * 回调函数。返回一个`字符串`，显示在列组表头中。
   * 请注意，默认情况下会导出列组，该选项在`skipColumnGroupHeaders=true`中不起作用。
   */
  processGroupHeaderCallback?(
    params: ProcessGroupHeaderForExportParams,
  ): string;
  /**
   * 回调函数。返回要在群组单元格中显示的`字符串`。
   */
  processRowGroupCallback?(params: ProcessRowGroupForExportParams): string;
}

export interface ExportParams<T> extends BaseExportParams {
  /**
   * 要放在导出工作表顶部的内容。
   */
  prependContent?: T;
  /**
   * 要放在导出的工作表底部的内容。
   */
  appendContent?: T;

  /** 用于返回要在导出中行下方插入的内容的回调函数。 */
  getCustomContentBelowRow?: (
    params: ProcessRowGroupForExportParams,
  ) => T | undefined;
}

export interface CsvCellData {
  /** The value of the cell. */
  value: string | null;
}

export interface CsvCell {
  /** The data that will be added to the cell. */
  data: CsvCellData;
  /**
   * The number of cells to span across (1 means span 2 columns).
   * Default: `0`
   */
  mergeAcross?: number;
}

export declare type CsvCustomContent = CsvCell[][] | string;

export interface CsvExportParams extends ExportParams<CsvCustomContent> {
  /**
   * 要在单元格值之间插入的分隔符。
   * Default: `,`
   */
  columnSeparator?: string;
  /**
   * 默认情况下，单元格值根据CSV格式规则进行编码：值用双引号括起来，值中的任何双引号都被转义,转义后的值变成了 \“My\”\“VALUE\” 。传入`true`，将值插入CSV文件，不进行转义。
   * 在这种情况下，您有责任确保没有单元格包含ColumnSeparator字符。
   * Default: `false`
   */
  suppressQuotes?: boolean;
}
