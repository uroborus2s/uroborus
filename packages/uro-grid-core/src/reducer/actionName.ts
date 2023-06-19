import type { CallbackInterface } from 'recoil';

export const ActionName = {
  KEYBOARD_FOCUS: 'keyboardFocus',
  MOUSE_FOCUS: 'mouseFocus',
  /** Pivot 模式标志已更改 */
  COLUMN_PIVOT_MODE_CHANGED: 'columnPivotModeChanged',
};

export interface GridAction extends CallbackInterface {
  type: string;
}
