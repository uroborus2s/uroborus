import { useEffectOnce } from '../../../uro-sense';
import { useRecoilValue } from 'recoil';
import {
  gridOptionsWrapperAtom,
  useManagedFocusFeature,
} from '@uroborus/grid-core';
import { EVENTS } from '@uroborus/grid-core/src/entity/eventKey';
import { KeyboardEvent, useCallback, useRef } from 'react';
import { KeyCode } from '@uroborus/grid-core/src/constants';
import useFocusService from '@uroborus/grid-core/src/hooks/useFocusService';
import {
  isStopPropagationForAgGrid,
  stopPropagationForAgGrid,
} from '@uroborus/core/src/util/event';

export type TDropZone = 'rowGroup' | 'pivot' | 'aggregation';

export default function (horizontal: boolean, dropZonePurpose: TDropZone) {
  const gridWrapOptions = useRecoilValue(gridOptionsWrapperAtom);

  const classes = gridWrapOptions!.getClasses();

  const eColumnDropListRef = useRef<HTMLDivElement>();

  const eFocusableRef = useRef<HTMLDivElement>();

  const resizeEnabledRef = useRef(false);

  const { findNextFocusableElement } = useFocusService();

  const handleKeyDown = (e: KeyboardEvent) => {
    const isVertical = !horizontal;

    let isNext = e.key === KeyCode.DOWN;
    let isPrevious = e.key === KeyCode.UP;

    if (!isVertical) {
      const isRtl = gridWrapOptions.isEnableRtl();
      isNext =
        (!isRtl && e.key === KeyCode.RIGHT) ||
        (isRtl && e.key === KeyCode.LEFT);
      isPrevious =
        (!isRtl && e.key === KeyCode.LEFT) ||
        (isRtl && e.key === KeyCode.RIGHT);
    }

    if (!isNext && !isPrevious) {
      return;
    }

    const el = findNextFocusableElement(eFocusableRef, false, isPrevious);

    if (el) {
      e.preventDefault();
      el.focus();
    }
  };

  const onTabKeyDown = (e: KeyboardEvent) => {
    if (!e.defaultPrevented) {
      const nextRoot = findNextFocusableElement(
        eFocusableRef,
        false,
        e.shiftKey,
      );

      if (!nextRoot) {
        return;
      }

      nextRoot.focus();
      e.preventDefault();
    }
  };

  useManagedFocusFeature({});
  const shouldStopEventPropagation = (e: KeyboardEvent) => false;

  const onKeyDownHandler = (e: KeyboardEvent) => {
    if (e.defaultPrevented || isStopPropagationForAgGrid(e)) {
      return;
    }

    if (shouldStopEventPropagation(e)) {
      stopPropagationForAgGrid(e);
      return;
    }

    if (e.key === KeyCode.TAB) {
      onTabKeyDown(e);
    } else if (handleKeyDown) {
      handleKeyDown(e);
    }
  };

  const getFocusedItem = () => {
    const eGui = eFocusableRef.current!;
    const { activeElement } = gridWrapOptions.getDocument() as Document;

    if (!eGui.contains(activeElement)) {
      return -1;
    }

    const items = Array.from(eGui.querySelectorAll('.column-drop-cell'));

    return items.indexOf(activeElement as HTMLElement);
  };

  const toggleResizable = (resizable: boolean) => {
    resizeEnabledRef.current = resizable;
  };

  const refreshGui = useCallback(() => {
    const resizeEnabled = resizeEnabledRef.current;

    const { scrollTop } = eColumnDropListRef.current!;

    const focusedIndex = getFocusedItem();

    let alternateElement = findNextFocusableElement();

    if (!alternateElement) {
      alternateElement = findNextFocusableElement(undefined, false, true);
    }

    toggleResizable(false);
  }, []);

  useEffectOnce(() => {
    const localeTextFunc = gridWrapOptions.getLocaleTextFunc();
    const emptyMessage = localeTextFunc(
      'rowGroupColumnsEmptyMessage',
      '拖动此处可设置行组',
    );
    const title = localeTextFunc('groups', '行组');

    gridWrapOptions.addManagedListener(
      'event',
      EVENTS.EVENT_NEW_COLUMNS_LOADED,
    );
    gridWrapOptions.addManagedListener('local', 'functionsReadOnly');
  });

  return { eColumnDropListRef, eFocusableRef, onKeyDownHandler, classes };
}
