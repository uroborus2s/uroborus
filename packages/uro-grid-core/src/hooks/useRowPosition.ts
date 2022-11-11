export interface RowPosition {
  /** A positive number from 0 to n, where n is the last row the grid is rendering
   * or -1 if you want to navigate to the grid header */
  rowIndex: number;

  /** Either 'top', 'bottom' or null (for not pinned) */
  rowPinned: string | null;
}
