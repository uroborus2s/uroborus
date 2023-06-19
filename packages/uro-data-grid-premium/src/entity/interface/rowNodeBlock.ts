export interface LoadSuccessParams {
  /**
   * Data retrieved from the server as requested by the grid.
   */
  rowData: any[];
  /**
   * The last row, if known, to help Infinite Scroll.
   */
  rowCount?: number;
  /**
   * @deprecated use groupLevelInfo instead
   */
  storeInfo?: any;
  /**
   * Any extra information for the grid to associate with this load.
   */
  groupLevelInfo?: any;
}
