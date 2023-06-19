import { KeyboardEvent, MutableRefObject, useCallback } from 'react';

import { GridOptionsService } from '../../service/gridOptionsService.js';
import {
  isStopPropagationForGrid,
  stopPropagationForGrid,
} from '../../util/event.js';
import { findNextFocusableElement } from '../../util/focusable.js';
import { KeyCode } from '../../util/keyCode.js';

export interface ManagedFocusCallbacks {
  shouldStopEventPropagation?: (e: KeyboardEvent) => boolean;
  onTabKeyDown?: (e: KeyboardEvent) => void;
  handleKeyDown?: (e: KeyboardEvent) => void;
}

export default (
  eFocusableRef: MutableRefObject<HTMLDivElement | null>,
  gridConfiguration: GridOptionsService,
  callbacks: ManagedFocusCallbacks,
) => {
  const {
    shouldStopEventPropagation = () => false,
    onTabKeyDown = (e: KeyboardEvent) => {
      if (e.defaultPrevented) {
        return;
      }

      const nextRoot = findNextFocusableElement(
        gridConfiguration!,
        eFocusableRef.current!,
        false,
        e.shiftKey,
      );

      if (!nextRoot) {
        return;
      }

      nextRoot.focus();
      e.preventDefault();
    },
    handleKeyDown,
  } = callbacks;
  const onKeydownHandle = useCallback(
    (event: KeyboardEvent) => {
      if (event.defaultPrevented || isStopPropagationForGrid(event)) {
        return;
      }
      if (shouldStopEventPropagation(event)) {
        stopPropagationForGrid(event);
        return;
      }
      if (event.key === KeyCode.TAB) {
        onTabKeyDown!(event);
      } else if (handleKeyDown) {
        handleKeyDown(event);
      }
    },
    [handleKeyDown],
  );

  return { onKeydownHandle };
};
