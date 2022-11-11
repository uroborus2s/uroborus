export class Constants {
  static ROW_BUFFER_SIZE = 10;

  static LAYOUT_INTERVAL = 500;

  static BATCH_WAIT_MILLIS = 50;

  // *** EXPORT *** //
  static EXPORT_TYPE_DRAG_COPY = 'dragCopy';

  static EXPORT_TYPE_CLIPBOARD = 'clipboard';

  static EXPORT_TYPE_EXCEL = 'excel';

  static EXPORT_TYPE_CSV = 'csv';

  // *** ROW_MODEL *** //
  static ROW_MODEL_TYPE_INFINITE = 'infinite';

  static ROW_MODEL_TYPE_VIEWPORT = 'viewport';

  static ROW_MODEL_TYPE_CLIENT_SIDE = 'clientSide';

  static ROW_MODEL_TYPE_SERVER_SIDE = 'serverSide';

  static ALWAYS = 'always';

  static ONLY_WHEN_GROUPING = 'onlyWhenGrouping';

  // *** PINNED *** //
  static PINNED_TOP = 'top';

  static PINNED_BOTTOM = 'bottom';

  // *** DOM_LAYOUT *** //
  static DOM_LAYOUT_NORMAL = 'normal';

  static DOM_LAYOUT_PRINT = 'print';

  static DOM_LAYOUT_AUTO_HEIGHT = 'autoHeight';

  static GROUP_AUTO_COLUMN_ID = 'ag-Grid-AutoColumn';

  static SOURCE_PASTE = 'paste';

  // *** PINNED *** //
  static PINNED_RIGHT = 'right';

  static PINNED_LEFT = 'left';

  static SORT_ASC = 'asc';

  static SORT_DESC = 'desc';

  // *** FOCUSABLE *** //
  static INPUT_SELECTOR = 'input, select, button, textarea';

  static FOCUSABLE_SELECTOR = '[tabindex], input, select, button, textarea';

  static FOCUSABLE_EXCLUDE =
    '.x-hidden, .x-hidden *, [disabled], .x-disabled, .x-disabled *';
}

export class KeyCode {
  static BACKSPACE = 'Backspace';

  static TAB = 'Tab';

  static ENTER = 'Enter';

  static ESCAPE = 'Escape';

  static SPACE = ' ';

  static LEFT = 'ArrowLeft';

  static UP = 'ArrowUp';

  static RIGHT = 'ArrowRight';

  static DOWN = 'ArrowDown';

  static DELETE = 'Delete';

  static F2 = 'F2';

  static PAGE_UP = 'PageUp';

  static PAGE_DOWN = 'PageDown';

  static PAGE_HOME = 'Home';

  static PAGE_END = 'End';

  // these should be used with `event.code` instead of `event.key`
  // as `event.key` changes when non-latin keyboards are used
  static A = 'KeyA';

  static C = 'KeyC';

  static V = 'KeyV';

  static D = 'KeyD';

  static Z = 'KeyZ';

  static Y = 'KeyY';
}
