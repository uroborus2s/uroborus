export interface GridConfiguration<TData = any> {
  /** Set to `true` to copy the cell range or focused cell to the clipboard and never the selected rows. Default: `false` */
  suppressCopyRowsToClipboard?: boolean;
  /** Set to `true` to copy rows instead of ranges when a range with only a single cell is selected. Default: `false` */
  suppressCopySingleCellRanges?: boolean;
  /** Set to `true` to work around a bug with Excel (Windows) that adds an extra empty line at the end of ranges copied to the clipboard. Default: `false` */
  suppressLastEmptyLineOnPaste?: boolean;
  /** Set to `true` to turn off paste operations within the grid. */
  suppressClipboardPaste?: boolean;
  /** Set to `true` to stop the grid trying to use the Clipboard API, if it is blocked, and immediately fallback to the workaround. */
  suppressClipboardApi?: boolean;

  /** Change this value to set the tabIndex order of the Grid within your application. Default: `0` */
  tabIndex?: number;
  /**
   * The number of rows rendered outside the viewable area the grid renders.
   * Having a buffer means the grid will have rows ready to show as the user slowly scrolls vertically.
   * Default: `10`
   */
  rowBuffer?: number;
}
