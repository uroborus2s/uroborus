export interface RowPosition {
  /** 0到n之间的正数，其中n是网格渲染的最后一行
   * 或者，如果要导航到网格标题，则为-1 */
  rowIndex: number;

  /** 'top', 'bottom' or null (不固定) */
  rowPinned: string | null;
}
