import { useEffectNomount } from '@/core/hooks';
import { ItemRect, VariableSizeListProps } from '@ibr/ibr-virtual-list/types';
import { DebouncedFunc } from 'lodash';
import debounce from 'lodash.debounce';
import throttle from 'lodash.throttle';

import {
  MutableRefObject,
  UIEvent,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export default function (
  props: VariableSizeListProps,
): [
  boolean,
  { startIndex: number; endIndex: number },
  MutableRefObject<ItemRect>,
  (enent: UIEvent<HTMLElement>) => void,
] {
  const [isScrolling, setIsScrolling] = useState(false);

  const [scrollOffset, setScrollOfset] = useState(0);

  const itemRectCache = useRef<ItemRect>({ rects: {}, lastMeasuredIndex: -1 });

  const debounceRef = useRef<DebouncedFunc<() => void>>();
  const throttleRef = useRef<DebouncedFunc<(offset: number) => void>>();

  useLayoutEffect(() => {
    debounceRef.current = debounce(() => {
      setIsScrolling(false);
    }, 500);

    return () => {
      if (debounceRef.current) debounceRef.current.cancel();
    };
  }, []);

  useLayoutEffect(() => {
    throttleRef.current = throttle(
      (offset: number) => {
        setScrollOfset(offset);
      },
      200,
      { leading: false },
    );

    return () => {
      if (throttleRef.current) throttleRef.current.cancel();
    };
  }, []);

  const onScroll = (enent: UIEvent<HTMLElement>) => {
    const target = enent.currentTarget;

    if (!isScrolling) setIsScrolling(true);

    if (throttleRef.current)
      throttleRef.current(
        props.direction !== 'horizontal' ? target.scrollTop : target.scrollLeft,
      );
    if (debounceRef.current) debounceRef.current();
  };

  const range = getRange(scrollOffset, itemRectCache, props);

  const { itemCount, itemSize, direction, width, height } = props;
  const outSize = direction !== 'horizontal' ? width : height;

  const [, force] = useState({});

  useEffectNomount(() => {
    const lastMeasuredIndex = itemRectCache.current.lastMeasuredIndex;
    if (lastMeasuredIndex >= 0)
      getItemRect(lastMeasuredIndex, itemRectCache, props, true);
    force({});
  }, [itemCount, outSize, itemSize]);

  return [isScrolling, range, itemRectCache, onScroll];
}

function getItemRect(
  index: number,
  itemCacheRef: MutableRefObject<ItemRect>,
  props: VariableSizeListProps,
  mode = false,
) {
  const lastMeasuredIndex = itemCacheRef.current.lastMeasuredIndex;
  const itemRects = itemCacheRef.current.rects;
  if (mode || index > lastMeasuredIndex) {
    let offset = 0;
    let start = 0;
    if (!mode) {
      if (lastMeasuredIndex >= 0) {
        const lastRect = itemRects[lastMeasuredIndex];
        offset = lastRect.offset + lastRect.size;
        start = lastMeasuredIndex + 1;
      }
    }
    for (let i = start; i <= index; i++) {
      const size = props.itemSize(i);
      itemRects[i] = { size: size, offset: offset };
      offset += size;
    }
    itemCacheRef.current.lastMeasuredIndex = index;
  }
  return itemRects[index];
}

function findNearestItem(
  start: number,
  end: number,
  offset: number,
  itemCacheRef: MutableRefObject<ItemRect>,
  props: VariableSizeListProps,
) {
  while (start <= end) {
    const middle = Math.floor((start + end) / 2);
    const currentOffset = getItemRect(middle, itemCacheRef, props).offset;
    if (currentOffset == offset) return middle;
    if (currentOffset > offset) {
      end = middle - 1;
    } else if (currentOffset < offset) {
      start = middle + 1;
    }
  }

  if (start > 0) return start - 1;
  else return 0;
}

function findIndexOfOffset(
  start: number,
  offset: number,
  itemCacheRef: MutableRefObject<ItemRect>,
  props: VariableSizeListProps,
) {
  const lastMeasuredIndex = itemCacheRef.current.lastMeasuredIndex;
  const itemRects = itemCacheRef.current.rects;
  const lastMeasuredItemOffset =
    lastMeasuredIndex > 0 ? itemRects[lastMeasuredIndex].offset : 0;
  if (lastMeasuredItemOffset >= offset) {
    return findNearestItem(
      start,
      lastMeasuredIndex,
      offset,
      itemCacheRef,
      props,
    );
  } else {
    let startIndex = Math.max(0, lastMeasuredIndex);
    let interval = 1;
    while (startIndex < props.itemCount) {
      if (getItemRect(startIndex, itemCacheRef, props).offset > offset) break;
      startIndex += interval;
      interval *= 2;
    }
    return findNearestItem(
      start,
      Math.min(startIndex, props.itemCount - 1),
      offset,
      itemCacheRef,
      props,
    );
  }
}

export function getOffsetOfIndex(
  index: number,
  itemCacheRef: MutableRefObject<ItemRect>,
  props: VariableSizeListProps,
): number {
  const lastMeasuredIndex = itemCacheRef.current.lastMeasuredIndex;
  const itemRects = itemCacheRef.current.rects;
  if (lastMeasuredIndex >= index) {
    return itemRects[index].offset;
  } else {
    return getItemRect(index, itemCacheRef, props).offset;
  }
}

export function getRange(
  offset: number,
  itemCacheRef: MutableRefObject<ItemRect>,
  props: VariableSizeListProps,
) {
  const startIndex = findIndexOfOffset(0, offset, itemCacheRef, props);
  const endIndex = findIndexOfOffset(
    startIndex,
    offset +
      Number(props.direction !== 'horizontal' ? props.height : props.width),
    itemCacheRef,
    props,
  );

  const overscanCount = props.overscanCount ?? 1;

  return {
    startIndex: Math.max(0, startIndex - overscanCount),
    endIndex: Math.min(props.itemCount - 1, endIndex + overscanCount),
  };
}
