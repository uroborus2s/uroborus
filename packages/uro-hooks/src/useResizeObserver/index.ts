import type { RefObject } from 'react';

import { ResizeObserver as Polyfill } from '@juggle/resize-observer';
import { toHump } from '@uroborus/core';

import useLayoutEffect from '../useLayoutEffect/index.js';

type ObservedSize = {
  width: number | undefined;
  height: number | undefined;
};

type ObservedSizeKey = keyof ObservedSize;

type ResizeObserverFiled =
  | 'borderBoxSize'
  | 'contentBoxSize'
  | 'devicePixelContentBoxSize';

type RoundingFunction = (n: number) => number;

const ResizeObserver =
  typeof window !== 'undefined' && 'ResizeObserver' in window
    ? window.ResizeObserver
    : Polyfill;

const extractSize = (
  entry: ResizeObserverEntry,
  boxProp: ResizeObserverFiled,
  sizeType: ObservedSizeKey,
): number | undefined => {
  if (!entry[boxProp]) {
    if (boxProp === 'contentBoxSize') {
      // 根据规范，`contentBoxSize` 和 `contentRect` 中的尺寸是等效的。
      // RO算法见说明中的第6步：
      // https://drafts.csswg.org/resize-observer/#create-and-populate-resizeobserverentry-h
      // > Set this.contentRect to logical this.contentBoxSize given target and observedBox of "content-box".
      // 在实际的浏览器实现中，当然这些对象不同，但 width height 值应该是等价的。
      return entry.contentRect[sizeType];
    }

    return undefined;
  }

  const inlineSizeType = (() => {
    const style = getComputedStyle(entry.target);
    if (sizeType === 'width') {
      return style.writingMode === 'horizontal-tb' ? 'inlineSize' : 'blockSize';
    }
    return style.writingMode === 'horizontal-tb' ? 'blockSize' : 'inlineSize';
  })();

  // A couple bytes smaller than calling Array.isArray() and just as effective here.
  return entry[boxProp][0]
    ? entry[boxProp][0][inlineSizeType]
    : // TS 抱怨这个，因为 RO 条目类型遵循规范并且没有反映 Firefox 当前返回对象而不是数组的行为 borderBoxSize 和 contentBoxSize 。
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      entry[boxProp][inlineSizeType];
};

const createResizeObserver = () => {
  let ticking = false;
  let allEntries: ResizeObserverEntry[] = [];

  const callbacks: Map<
    Element,
    Array<(entry: ResizeObserverEntry) => void>
  > = new Map();

  const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    allEntries = allEntries.concat(entries);
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const triggered = new Set<Element>();
        for (let i = allEntries.length - 1; i >= 0; i -= 1) {
          if (!triggered.has(allEntries[i].target)) {
            triggered.add(allEntries[i].target);
            const cbs = callbacks.get(allEntries[i].target);
            if (cbs)
              for (const cb of cbs) {
                cb(allEntries[i]);
              }
          }
        }
        allEntries = [];
        ticking = false;
      });
    }
    ticking = true;
  });

  return {
    observer,
    subscribe(
      target: HTMLElement,
      callback: (entry: ResizeObserverEntry) => void,
      box: ResizeObserverBoxOptions,
    ) {
      observer.observe(target, { box });
      const cbs = callbacks.get(target) ?? [];
      cbs.push(callback);
      callbacks.set(target, cbs);
    },
    unsubscribe(
      target: HTMLElement,
      callback: (entry: ResizeObserverEntry) => void,
    ) {
      const cbs = callbacks.get(target) ?? [];
      if (cbs.length === 1) {
        observer.unobserve(target);
        callbacks.delete(target);
        return;
      }
      const cbIndex = cbs.indexOf(callback);
      if (cbIndex !== -1) cbs.splice(cbIndex, 1);
      callbacks.set(target, cbs);
    },
  };
};

// eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle
let _resizeObserver: ReturnType<typeof createResizeObserver>;

const getResizeObserver = () => {
  if (!_resizeObserver) _resizeObserver = createResizeObserver();
  return _resizeObserver;
};

function useResizeObserver<T extends HTMLElement>(opts: {
  ref: RefObject<T> | T;
  setState: (
    value: ObservedSize | ((prevState: ObservedSize) => ObservedSize),
  ) => void;
  box?: ResizeObserverBoxOptions;
  round?: RoundingFunction;
}) {
  // 观察ResizeObserver并将回调函数保存到ref。
  const { box = 'content-box', round = Math.round, ref, setState } = opts;
  const resizeObserver = getResizeObserver();

  useLayoutEffect(() => {
    let didUnsubscribe = false;
    const targetEl = ref && 'current' in ref ? ref.current : ref;
    if (!targetEl) return () => {};

    const cb = (entry: ResizeObserverEntry) => {
      if (didUnsubscribe) return;
      if (getComputedStyle(entry.target).display === 'none') return;
      const boxProp = `${toHump(box, '-')}Size` as ResizeObserverFiled;
      const reportedWidth = extractSize(entry, boxProp, 'width');
      const reportedHeight = extractSize(entry, boxProp, 'height');

      const newWidth = reportedWidth ? round(reportedWidth) : undefined;
      const newHeight = reportedHeight ? round(reportedHeight) : undefined;
      const newRect = {
        width: newWidth,
        height: newHeight,
      };
      setState((rect) => {
        if (rect.height === newRect.height && rect.width === newRect.width) {
          return rect;
        }
        return newRect;
      });
    };

    resizeObserver.subscribe(targetEl as HTMLElement, cb, box);

    return () => {
      didUnsubscribe = true;
      resizeObserver.unsubscribe(targetEl as HTMLElement, cb);
    };
  }, [ref, resizeObserver, setState, box, round]);

  return resizeObserver.observer;
}

export default useResizeObserver;
