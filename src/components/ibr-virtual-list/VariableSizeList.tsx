import { useEffectNomount } from '@/core/hooks';
import composeClasses from '@mui/core/composeClasses';
import styled from '@mui/material/styles/styled';
import classNames from 'classnames';
import {
  createElement,
  forwardRef,
  ForwardRefRenderFunction,
  LegacyRef,
  memo,
  MutableRefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  InStateProps,
  ItemRect,
  VariableSizeListProps,
  VirtualList,
} from './types';
import useScroll, { getOffsetOfIndex } from './useScroll';
import { getVariablesizelistUtilityClass } from './variablesizelistClasses';

const useUtilityClasses = (ownerState: InStateProps) => {
  const { classes } = ownerState;

  const slots = {
    root: ['root'],
    content: ['content'],
    item: ['item'],
  };

  return composeClasses(slots, getVariablesizelistUtilityClass, classes);
};

const ListContainer = styled('div', {
  name: 'IuiVirtualList',
  slot: 'Root',
  overridesResolver: (props, styles) => [styles.root],
})<{ ownerState: InStateProps }>(({ ownerState: { width, height } }) => ({
  position: 'relative',
  overflow: 'auto',
  WebkitOverflowScrolling: 'touch',
  willChange: 'transform',
  height: height,
  width: width,
}));

const ListContent = styled('div', {
  name: 'IuiVirtualList',
  slot: 'Content',
  overridesResolver: (props, styles) => [styles.content],
})<{ ownerState: InStateProps }>(
  ({ ownerState: { isScrolling, direction, estimatedTotalSize } }) => ({
    height: direction !== 'horizontal' ? estimatedTotalSize : '100%',
    pointerEvents: isScrolling ? 'none' : undefined,
    width: direction !== 'horizontal' ? '100%' : estimatedTotalSize,
  }),
);

const ListItem = styled('div', {
  name: 'IuiVirtualList',
  slot: 'Item',
  overridesResolver: (props, styles) => [styles.item],
})<{ ownerState: InStateProps }>(
  ({ ownerState: { direction, size, offset } }) => ({
    position: 'absolute',
    ...(direction != 'horizontal'
      ? { height: size, top: offset }
      : { width: size, left: offset }),
  }),
);

const VariableSizeList: ForwardRefRenderFunction<
  VirtualList,
  VariableSizeListProps
> = (props, ref) => {
  const {
    itemSize,
    component = 'div',
    classes: classesProps,
    className,
    children,
    width,
    height,
    direction,
    itemCount,
    ...other
  } = props;

  const containerRef = useRef<HTMLElement>();
  const contentRef = useRef<HTMLElement>();

  const [isScrolling, range, itemRectCache, onScroll] = useScroll(props);

  const estimatedTotalSize = getEstimatedTotalSize(itemRectCache, props);

  const [scrollIndex, setScrollIndex] = useState(0);

  const scrollTo = (offset: number) => {
    setScrollIndex(offset);
  };

  useEffectNomount(() => {
    containerRef.current?.scrollTo({
      ...(direction != 'horizontal'
        ? { top: scrollIndex }
        : { left: scrollIndex }),
      behavior: 'smooth',
    });
  }, [scrollIndex]);

  useImperativeHandle(
    ref,
    () => ({
      scrollTo: scrollTo,
      scrollToItem: (index: number) => {
        const offset = getOffsetOfIndex(index, itemRectCache, props);
        scrollTo(offset);
      },
    }),
    [props],
  );

  const ownerState: InStateProps = {
    classes: classesProps,
    width,
    height,
    direction,
    isScrolling,
    estimatedTotalSize,
  };
  const classes = useUtilityClasses(ownerState);

  const items = [];

  if (itemCount > 0) {
    for (let _index = range.startIndex; _index <= range.endIndex; _index++) {
      items.push(
        <ListItem
          key={_index}
          className={classes.item}
          ownerState={{
            ...ownerState,
            size: itemRectCache.current.rects[_index].size,
            offset: itemRectCache.current.rects[_index].offset,
          }}
        >
          {createElement(children, { index: _index })}
        </ListItem>,
      );
    }
  }
  return (
    <ListContainer
      as={component}
      className={classNames(className, classes.root)}
      ownerState={ownerState}
      onScroll={onScroll}
      ref={containerRef as LegacyRef<HTMLDivElement>}
      {...other}
    >
      <ListContent
        ref={contentRef as LegacyRef<HTMLDivElement>}
        ownerState={ownerState}
        className={classes.content}
      >
        {items}
      </ListContent>
    </ListContainer>
  );
};

export default memo(forwardRef(VariableSizeList));

const getEstimatedTotalSize = (
  itemCacheRef: MutableRefObject<ItemRect>,
  props: VariableSizeListProps,
) => {
  let lastMeasuredIndex = itemCacheRef.current.lastMeasuredIndex;
  const itemRects = itemCacheRef.current.rects;

  let totalSizeOfMeasuredItems = 0;

  if (lastMeasuredIndex >= props.itemCount) {
    lastMeasuredIndex = props.itemCount - 1;
  }

  if (lastMeasuredIndex >= 0) {
    const itemMetadata = itemRects[lastMeasuredIndex];
    totalSizeOfMeasuredItems = itemMetadata.offset + itemMetadata.size;
  }

  const numUnmeasuredItems = props.itemCount - lastMeasuredIndex - 1;
  return (
    totalSizeOfMeasuredItems +
    numUnmeasuredItems * Number(props.estimatedTotalSize ?? 80)
  );
};
