import { atom, useRecoilValue } from 'recoil';
import { Layout } from '@/entity/types/domLayout';
import { syncEffect } from 'recoil-sync';
import { string } from '@recoiljs/refine';
import { Property } from 'csstype';
import { GridSizeChangedEvent } from '@/entity/types/enevtType';
import { EVENTS } from '@/entity/eventKey';
import { gridContext } from '@/hooks/core/useCreatContext';
import { ForwardedRef, useMemo } from 'react';
import { useReSize } from '../../../uro-sense';
import { unstable_useForkRef as useForkRef } from '@mui/utils';
import createTheme from '@/styles/createTheme';
import { GridContext } from '@/entity';
import UserSelect = Property.UserSelect;
import Cursor = Property.Cursor;

export const userSelectAtom = atom<UserSelect>({
  key: '@uroborus/grid/user-select',
  default: 'none',
});

export const cursorAtom = atom<Cursor>({
  key: '@uroborus/grid/cursor',
  default: 'auto',
});

export const layoutClassesAtom = atom<Layout>({
  key: '@uroborus/grid/layout-classes',
  default: 'normal',
  effects: [syncEffect({ itemKey: 'domLayout', refine: string() })],
});

export const keyboardFocusAtom = atom<boolean>({
  key: '@uroborus/grid/keyboard-focus',
  default: false,
});

export const themeModeAtom = atom<'light' | 'dark'>({
  key: '@uroborus/grid/themeMode',
  default: 'light',
});

export default (ref: ForwardedRef<HTMLElement>) => {
  const {
    classes: classesProps,
    eventService,
    getProperty,
    getDocument,
  } = useRecoilValue(gridContext) as GridContext;

  const userSelect = useRecoilValue(userSelectAtom);
  const cursor = useRecoilValue(cursorAtom);
  const layoutClasses = useRecoilValue(layoutClassesAtom);
  const isKeyboardFocus = useRecoilValue(keyboardFocusAtom);
  const themeMode = useRecoilValue(themeModeAtom);

  // Update the theme only if the mode changes
  const theme = useMemo(
    () => createTheme({ palette: { mode: themeMode } }),
    [themeMode],
  );

  const ownerState = {
    classes: classesProps,
    userSelect,
    cursor,
    layoutClasses,
    isKeyboardFocus,
    isRtl: getProperty('enableRtl') as boolean,
  };

  const onResize = ({
    width,
    height,
  }: {
    width: number | undefined;
    height: number | undefined;
  }) => {
    const event: GridSizeChangedEvent = {
      type: EVENTS.EVENT_GRID_SIZE_CHANGED,
      clientWidth: width || 0,
      clientHeight: height || 0,
    };
    eventService.emit(event);
  };

  const { ref: eResizeRef } = useReSize({
    onResize,
  });

  const eRootRef = useForkRef(ref, eResizeRef);

  return { ownerState, eRootRef, getDocument, getProperty, theme };
};
