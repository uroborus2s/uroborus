import type { FC } from 'react';
import { KeyboardEvent, memo, useCallback, useEffect, useRef } from 'react';

import { useRecoilValue } from 'recoil';

import useManagedFocusFeature from '../../hooks/features/useManagedFocusFeature.js';
import { gridConfigurationGlobal } from '../../hooks/index.js';
import useUtilityClasses from '../../hooks/useUtilityClasses.js';
import { Events } from '../../util/event.js';
import { findNextFocusableElement } from '../../util/focusable.js';
import { KeyCode } from '../../util/keyCode.js';

import { BaseDropZonePanelProps } from './headerDropProps.js';

const BaseDropZonePanel: FC<BaseDropZonePanelProps> = ({
  vertical,
  dragAndDropIcon,
  title,
  emptyMessage,
  shouldStopEventPropagation = () => false,
}) => {
  const classes = useUtilityClasses({
    unselectable: ['unselectable', 'focus-managed'],
    columnDropList: [
      'column-drop-list',
      vertical ? 'column-drop-vertical-list' : 'column-drop-horizontal-list',
    ],
  });
  const eFocusableRef = useRef<HTMLDivElement | null>(null);

  const resizeEnabled = useRef(false);
  const gridConfiguration = useRecoilValue(gridConfigurationGlobal);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const isVertical = !!vertical;

    let isNext = event.key === KeyCode.DOWN;
    let isPrevious = event.key === KeyCode.UP;

    if (!isVertical) {
      const isRtl = gridConfiguration!.is('enableRtl');
      isNext =
        (!isRtl && event.key === KeyCode.RIGHT) ||
        (isRtl && event.key === KeyCode.LEFT);
      isPrevious =
        (!isRtl && event.key === KeyCode.LEFT) ||
        (isRtl && event.key === KeyCode.RIGHT);
    }

    if (!isNext && !isPrevious) {
      return;
    }

    const el = findNextFocusableElement(
      gridConfiguration!,
      eFocusableRef.current!,
      false,
      isPrevious,
    );

    if (el) {
      event.preventDefault();
      el.focus();
    }
  }, []);

  const getFocusedItem = () => {
    const { activeElement } = gridConfiguration!.getDocument();

    if (!eFocusableRef.current!.contains(activeElement)) {
      return -1;
    }

    const items = Array.from(
      eFocusableRef.current!.querySelectorAll('.uro-column-drop-cell'),
    );

    return items.indexOf(activeElement as HTMLElement);
  };

  const { onKeydownHandle } = useManagedFocusFeature(
    eFocusableRef,
    gridConfiguration!,
    {
      handleKeyDown,
    },
  );

  useEffect(() => {
    const refreshGui = () => {
      const { scrollTop } = eFocusableRef.current!;
      const focusedIndex = getFocusedItem();

      let alternateElement = findNextFocusableElement(gridConfiguration!);

      if (!alternateElement) {
        alternateElement = findNextFocusableElement(
          gridConfiguration!,
          undefined,
          false,
          true,
        );
      }
    };
    gridConfiguration?.addEventListener(
      Events.EVENT_NEW_COLUMNS_LOADED,
      refreshGui,
    );

    return () =>
      gridConfiguration?.removeEventListener(
        Events.EVENT_NEW_COLUMNS_LOADED,
        refreshGui,
      );
  }, []);

  return (
    <div
      className={classes.unselectable}
      role="presentation"
      onKeyDown={onKeydownHandle}
      ref={eFocusableRef}
    >
      <div className={classes.columnDropList} role="listbox" />
    </div>
  );
};

export default memo(BaseDropZonePanel);
