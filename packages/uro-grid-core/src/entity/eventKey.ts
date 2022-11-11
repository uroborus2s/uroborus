export const EVENTS = {
  /** 新增列 */
  EVENT_NEW_COLUMNS_LOADED: 'newColumnsLoaded',

  /** 透视模式标志已改 */
  EVENT_COLUMN_PIVOT_MODE_CHANGED: 'columnPivotModeChanged',

  /** 添加、删除了行组列或更改了顺序。 */
  EVENT_COLUMN_ROW_GROUP_CHANGED: 'columnRowGroupChanged',

  /** expandAll / collapseAll was called from the api. */
  EVENT_EXPAND_COLLAPSE_ALL: 'expandOrCollapseAll',

  /** A pivot column was added, removed or order changed. */
  EVENT_COLUMN_PIVOT_CHANGED: 'columnPivotChanged',

  /** The list of grid columns has changed. */
  EVENT_GRID_COLUMNS_CHANGED: 'gridColumnsChanged',

  /** A value column was added, removed or agg function was changed. */
  EVENT_COLUMN_VALUE_CHANGED: 'columnValueChanged',

  /** A column was moved */
  EVENT_COLUMN_MOVED: 'columnMoved',

  /** One or more columns was shown / hidden */
  EVENT_COLUMN_VISIBLE: 'columnVisible',

  /** One or more columns was pinned / unpinned */
  EVENT_COLUMN_PINNED: 'columnPinned',

  /** A column group was opened / closed */
  EVENT_COLUMN_GROUP_OPENED: 'columnGroupOpened',

  /** One or more columns was resized. If just one, the column in the event is set. */
  EVENT_COLUMN_RESIZED: 'columnResized',

  /** The list of displayed columns has changed, can result from columns open / close, column move, pivot, group, etc */
  EVENT_DISPLAYED_COLUMNS_CHANGED: 'displayedColumnsChanged',

  /** The list of virtual columns has changed, results from viewport changing */
  EVENT_VIRTUAL_COLUMNS_CHANGED: 'virtualColumnsChanged',

  /** Async Transactions Executed */
  EVENT_ASYNC_TRANSACTIONS_FLUSHED: 'asyncTransactionsFlushed',

  /** A row group was opened / closed */
  EVENT_ROW_GROUP_OPENED: 'rowGroupOpened',

  /** @deprecated use EVENT_ROW_DATA_UPDATED instead */
  EVENT_ROW_DATA_CHANGED: 'rowDataChanged',

  /** The client has updated data for the grid */
  EVENT_ROW_DATA_UPDATED: 'rowDataUpdated',

  /** The client has set new floating data into the grid */
  EVENT_PINNED_ROW_DATA_CHANGED: 'pinnedRowDataChanged',

  /** Range selection has changed */
  EVENT_RANGE_SELECTION_CHANGED: 'rangeSelectionChanged',

  /** Chart was created */
  EVENT_CHART_CREATED: 'chartCreated',

  /** Chart Range selection has changed */
  EVENT_CHART_RANGE_SELECTION_CHANGED: 'chartRangeSelectionChanged',

  /** Chart Options have changed */
  EVENT_CHART_OPTIONS_CHANGED: 'chartOptionsChanged',

  /** Chart was destroyed */
  EVENT_CHART_DESTROYED: 'chartDestroyed',

  /** For when the tool panel is shown / hidden */
  EVENT_TOOL_PANEL_VISIBLE_CHANGED: 'toolPanelVisibleChanged',

  EVENT_COLUMN_PANEL_ITEM_DRAG_START: 'columnPanelItemDragStart',
  EVENT_COLUMN_PANEL_ITEM_DRAG_END: 'columnPanelItemDragEnd',

  /** Model was updated - grid updates the drawn rows when this happens */
  EVENT_MODEL_UPDATED: 'modelUpdated',

  EVENT_PASTE_START: 'pasteStart',
  EVENT_PASTE_END: 'pasteEnd',

  EVENT_FILL_START: 'fillStart',
  EVENT_FILL_END: 'fillEnd',

  EVENT_CELL_CLICKED: 'cellClicked',
  EVENT_CELL_DOUBLE_CLICKED: 'cellDoubleClicked',
  EVENT_CELL_MOUSE_DOWN: 'cellMouseDown',
  EVENT_CELL_CONTEXT_MENU: 'cellContextMenu',
  EVENT_CELL_VALUE_CHANGED: 'cellValueChanged',
  EVENT_CELL_EDIT_REQUEST: 'cellEditRequest',
  EVENT_ROW_VALUE_CHANGED: 'rowValueChanged',
  EVENT_CELL_FOCUSED: 'cellFocused',
  EVENT_FULL_WIDTH_ROW_FOCUSED: 'fullWidthRowFocused',
  EVENT_ROW_SELECTED: 'rowSelected',
  EVENT_SELECTION_CHANGED: 'selectionChanged',

  EVENT_CELL_KEY_DOWN: 'cellKeyDown',
  EVENT_CELL_KEY_PRESS: 'cellKeyPress',

  EVENT_CELL_MOUSE_OVER: 'cellMouseOver',
  EVENT_CELL_MOUSE_OUT: 'cellMouseOut',

  /** 2 events for filtering. The grid LISTENS for filterChanged and afterFilterChanged */
  EVENT_FILTER_CHANGED: 'filterChanged',

  /** Filter was change but not applied. Only useful if apply buttons are used in filters. */
  EVENT_FILTER_MODIFIED: 'filterModified',
  EVENT_FILTER_OPENED: 'filterOpened',

  EVENT_SORT_CHANGED: 'sortChanged',

  /** A row was removed from the dom, for any reason. Use to clean up resources (if any) used by the row. */
  EVENT_VIRTUAL_ROW_REMOVED: 'virtualRowRemoved',

  EVENT_ROW_CLICKED: 'rowClicked',
  EVENT_ROW_DOUBLE_CLICKED: 'rowDoubleClicked',

  /** Gets called once after the grid has finished initialising. */
  EVENT_GRID_READY: 'gridReady',
  /** Width of height of the main grid div has changed. Grid listens for this and does layout of grid if it's
   * changed, so always filling the space it was given. */
  EVENT_GRID_SIZE_CHANGED: 'gridSizeChanged',
  /** The indexes of the rows rendered has changed, eg user has scrolled to a new vertical position. */
  EVENT_VIEWPORT_CHANGED: 'viewportChanged',
  /* The width of the scrollbar has been calculated */
  EVENT_SCROLLBAR_WIDTH_CHANGED: 'scrollbarWidthChanged',
  /** Rows were rendered for the first time (ie on async data load). */
  EVENT_FIRST_DATA_RENDERED: 'firstDataRendered',
  /** A column drag has started, either resizing a column or moving a column. */
  EVENT_DRAG_STARTED: 'dragStarted',
  /** A column drag has stopped */
  EVENT_DRAG_STOPPED: 'dragStopped',

  EVENT_CHECKBOX_CHANGED: 'checkboxChanged',

  EVENT_ROW_EDITING_STARTED: 'rowEditingStarted',
  EVENT_ROW_EDITING_STOPPED: 'rowEditingStopped',

  EVENT_CELL_EDITING_STARTED: 'cellEditingStarted',
  EVENT_CELL_EDITING_STOPPED: 'cellEditingStopped',

  /** Main body of grid has scrolled, either horizontally or vertically */
  EVENT_BODY_SCROLL: 'bodyScroll',

  /** Main body of the grid has stopped scrolling, either horizontally or vertically */
  EVENT_BODY_SCROLL_END: 'bodyScrollEnd',

  EVENT_HEIGHT_SCALE_CHANGED: 'heightScaleChanged',

  /** The displayed page for pagination has changed. For example the data was filtered or sorted,
   * or the user has moved to a different page. */
  EVENT_PAGINATION_CHANGED: 'paginationChanged',

  /** Only used by React, Angular, Web Components and VueJS AG Grid components
   * (not used if doing plain JavaScript). If the grid receives changes due
   * to bound properties, this event fires after the grid has finished processing the change. */
  EVENT_COMPONENT_STATE_CHANGED: 'componentStateChanged',

  /** ***************************  INTERNAL EVENTS: START ******************************************* */

  /** Please remember to add to ComponentUtil.EXCLUDED_INTERNAL_EVENTS to not have these events exposed to framework components. */

  /** All items from here down are used internally by the grid, not intended for external use. */
  // not documented, either experimental, or we just don't want users using an depending on them
  EVENT_BODY_HEIGHT_CHANGED: 'bodyHeightChanged',
  EVENT_DISPLAYED_COLUMNS_WIDTH_CHANGED: 'displayedColumnsWidthChanged',
  EVENT_SCROLL_VISIBILITY_CHANGED: 'scrollVisibilityChanged',
  EVENT_COLUMN_HOVER_CHANGED: 'columnHoverChanged',
  EVENT_FLASH_CELLS: 'flashCells',
  EVENT_PAGINATION_PIXEL_OFFSET_CHANGED: 'paginationPixelOffsetChanged',
  EVENT_DISPLAYED_ROWS_CHANGED: 'displayedRowsChanged',

  EVENT_LEFT_PINNED_WIDTH_CHANGED: 'leftPinnedWidthChanged',
  EVENT_RIGHT_PINNED_WIDTH_CHANGED: 'rightPinnedWidthChanged',

  EVENT_ROW_CONTAINER_HEIGHT_CHANGED: 'rowContainerHeightChanged',
  EVENT_HEADER_HEIGHT_CHANGED: 'headerHeightChanged',
  EVENT_COLUMN_HEADER_HEIGHT_CHANGED: 'columnHeaderHeightChanged',

  EVENT_ROW_DRAG_ENTER: 'rowDragEnter',
  EVENT_ROW_DRAG_MOVE: 'rowDragMove',
  EVENT_ROW_DRAG_LEAVE: 'rowDragLeave',
  EVENT_ROW_DRAG_END: 'rowDragEnd',

  // primarily for charts
  EVENT_POPUP_TO_FRONT: 'popupToFront',

  // these are used for server side group and agg - only used by CS with Viewport Row Model - intention is
  // to design these better around server side functions and then release to general public when fully working with
  // all the row models.
  EVENT_COLUMN_ROW_GROUP_CHANGE_REQUEST: 'columnRowGroupChangeRequest',
  EVENT_COLUMN_PIVOT_CHANGE_REQUEST: 'columnPivotChangeRequest',
  EVENT_COLUMN_VALUE_CHANGE_REQUEST: 'columnValueChangeRequest',
  EVENT_COLUMN_AGG_FUNC_CHANGE_REQUEST: 'columnAggFuncChangeRequest',

  EVENT_KEYBOARD_FOCUS: 'keyboardFocus',
  EVENT_MOUSE_FOCUS: 'mouseFocus',

  EVENT_STORE_UPDATED: 'storeUpdated',
};

export const LOCAL_EVENT_TYPE = {
  EVENT_DOM_LAYOUT: 'domLayout',
};
