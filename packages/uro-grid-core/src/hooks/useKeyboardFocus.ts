import { useRef } from 'react';

import { useRecoilCallback } from 'recoil';

import { ActionName } from '../reducer/actionName.js';
import dispatch from '../reducer/dispatch.js';
import { GridOptionsService } from '../service/gridOptionsService.js';

export default (gridConfiguration: GridOptionsService) => {
  const keyboardModeActive = useRef(false);
  const onToggleKeyboardMode = useRecoilCallback(
    (parameter) => (event: KeyboardEvent | MouseEvent | TouchEvent) => {
      const isKeyboardActive = keyboardModeActive.current;
      const isKeyboardEvent = event.type === 'keydown';
      if (isKeyboardEvent) {
        // the following keys should not toggle keyboard mode.
        if (event.ctrlKey || event.metaKey || event.altKey) {
          return;
        }
      }
      if (
        (isKeyboardActive && isKeyboardEvent) ||
        (!isKeyboardActive && !isKeyboardEvent)
      ) {
        return;
      }

      keyboardModeActive.current = isKeyboardEvent;
      const doc = (event.target as HTMLElement).ownerDocument;

      if (!doc) {
        return;
      }
      dispatch({
        type: isKeyboardEvent
          ? ActionName.KEYBOARD_FOCUS
          : ActionName.MOUSE_FOCUS,
        ...parameter,
      });
    },
    [gridConfiguration],
  );
  return { onToggleKeyboardMode };
};
