export interface ServerSideTransaction {
  /**
   * The Row Store to apply the transaction to, ie what group level.
   * eg ['Ireland','2002'] to update the child store found after expanding Ireland and 2002 groups.
   * Passing in blank to empty applies the transaction to the top level.
   */
  route?: string[];
  /** Index position to add at. If missing, rows will be added to the end. */
  addIndex?: number;
  /** Rows to add */
  add?: any[];
  /** Rows to remove */
  remove?: any[];
  /** Rows to update */
  update?: any[];
}
