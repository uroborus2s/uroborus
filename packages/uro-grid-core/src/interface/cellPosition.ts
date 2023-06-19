import type { RowPinnedType } from './rowNode.js';

export interface RowPosition {
  /** 从 0 到 n 的正数，其中 n 是网格呈现的最后一行，如果要导航到网格标题，则为 -1 */
  rowIndex: number;

  /** Either 'top', 'bottom' or null/undefined (for not pinned) */
  rowPinned: RowPinnedType;
}

// 这是作为 JavaScript 用户传入和传出 api 的内容
export interface CellPosition extends RowPosition {
  /** The grid column */
}
