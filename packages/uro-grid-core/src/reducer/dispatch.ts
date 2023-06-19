import { ActionName, GridAction } from './actionName.js';
import dispatchKeyboardFocus from './keyboardFocus.js';

const eventService: Record<string, <P extends GridAction>(args: P) => void> = {
  [ActionName.KEYBOARD_FOCUS]: dispatchKeyboardFocus,
  [ActionName.MOUSE_FOCUS]: dispatchKeyboardFocus,
  // [ActionName.COLUMN_PIVOT_MODE_CHANGED]: dispatchClearFocusedCell,
};

export default <P extends GridAction>(action: P) => {
  const { type } = action;
  eventService[type](action);
};
