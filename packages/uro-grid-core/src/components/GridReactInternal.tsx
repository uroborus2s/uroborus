import { forwardRef, memo, useRef } from 'react';

import { useForkRef } from '@uroborus/core';
import classNames from 'classnames';
import { useRecoilValue } from 'recoil';
import { useSlot } from 'sense-ui/styles';

import {
  gridConfigurationGlobal,
  horizontalResizeClassAtom,
  layoutClassAtom,
  useGridSize,
  useKeyboardFocus,
} from '../hooks/index.js';
import useUtilityClasses from '../hooks/useUtilityClasses.js';
import { keyboardFocusClassState } from '../reducer/keyboardFocus.js';

import GridHeaderDropZones from './GridHeaderDropZones/GridHeaderDropZones.js';
import type { GridInternalProps } from './gridProps.js';
import { GridRootStyle } from './GridRootStyles.js';

let renderIndex = 0;

const GridReactInternal = forwardRef<HTMLElement, GridInternalProps>(
  ({ className, ...other }, ref) => {
    renderIndex += 1;
    console.log(`更新节点DataGridReactInternal:${renderIndex}`);
    const layoutClass = useRecoilValue(layoutClassAtom);
    const { userSelect, cursor } = useRecoilValue(horizontalResizeClassAtom);
    const gridConfiguration = useRecoilValue(gridConfigurationGlobal)!;
    const rtl = gridConfiguration.is('enableRtl');
    const { onToggleKeyboardMode } = useKeyboardFocus(gridConfiguration);
    const keyboardFocusClass = useRecoilValue(keyboardFocusClassState);
    const ownerState = {
      keyboardFocusClass,
      layoutClass,
      userSelect,
      cursor,
      rtl,
    };

    const classes = useUtilityClasses({
      root: [
        'root',
        rtl ? 'rtl' : 'ltr',
        `layout-${layoutClass}`,
        keyboardFocusClass && 'keyboardFocus',
      ],
    });

    const localRootRef = useRef<HTMLElement | null>(null);
    const rootRef = useForkRef(ref, localRootRef);
    useGridSize(localRootRef);

    const [SlotRoot, rootProps] = useSlot('root', {
      ref: rootRef,
      className: classNames(classes.root, className),
      elementType: GridRootStyle,
      externalForwardedProps: other as any,
      ownerState,
      additionalProps: {
        role: 'presentation',
      },
    });

    return (
      <SlotRoot
        onKeyDown={onToggleKeyboardMode}
        onMouseDown={onToggleKeyboardMode}
        {...rootProps}
      >
        {/* uro-grid */}
        <GridHeaderDropZones />
      </SlotRoot>
    );
  },
);

GridReactInternal.displayName = 'Uro-DataGrid';

export default memo(GridReactInternal);
