import type { FC } from 'react';
import { DragEvent, memo } from 'react';

import styled, { useSlot } from 'sense-ui/styles';

import useUtilityClasses, {
  gridClasses,
  gridComponentName,
} from '../../hooks/useUtilityClasses.js';

import type { PositionableProps } from './positionableProps.js';
import { ResizableSides, ResizableStructure } from './positionableProps.js';

const PositionableStyles = styled('div', {
  name: gridComponentName,
  slot: 'Positionable',
  overridesResolver: (props, styles) => styles.positionable,
})({
  [`& > .${gridClasses.resizer}`]: {
    position: 'absolute',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 1,
  },
  [`& > .${gridClasses.resizer}.${gridClasses['resizer-topLeft']}`]: {
    top: 0,
    left: 0,
    height: 5,
    width: 5,
    cursor: 'nwse-resize',
  },
});

const PositionableFeature: FC<PositionableProps> = ({ resizable }) => {
  const classes = useUtilityClasses({
    resizerWrapper: ['resizer-wrapper'],
    topLeft: ['resizer', 'resizer-topLeft'],
    top: ['resizer', 'resizer-top'],
    topRight: ['resizer', 'resizer-topRight'],
    right: ['resizer', 'resizer-right'],
    bottomRight: ['resizer', 'resizer-bottomRight'],
    bottom: ['resizer', 'resizer-bottom'],
    bottomLeft: ['resizer', 'resizer-bottomLeft'],
    left: ['resizer', 'resizer-left'],
  });

  const [SlotRoot, rootProps] = useSlot('positionable', {
    className: classes.resizerWrapper,
    elementType: PositionableStyles,
    externalForwardedProps: {},
    ownerState: {},
  });

  let resizableProps: ResizableStructure;
  if (resizable) {
    if (typeof resizable === 'boolean') {
      resizableProps = {
        topLeft: resizable,
        top: resizable,
        topRight: resizable,
        right: resizable,
        bottomRight: resizable,
        bottom: resizable,
        bottomLeft: resizable,
        left: resizable,
      };
    } else resizableProps = { ...resizable };
    const onResizeStart = (side: ResizableSides) => (event: DragEvent) => {};

    const child = Object.entries(resizableProps)
      .filter(([_, value]) => value)
      .map(([key, _]) => (
        <div
          key={key}
          className={classes[key as ResizableSides]}
          mousedown={onResizeStart(key as ResizableSides)}
          mousemove={}
          mouseup={}
          contextMenu={}
        />
      ));
    return <SlotRoot {...rootProps}>{child}</SlotRoot>;
  }
  return null;
};

export default memo(PositionableFeature);
