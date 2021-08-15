import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import useRefCallback from '@/util/hooks/useRefCallback';
import useDebounce from '@/util/hooks/useDebounce';

export default function <T extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<T | undefined>,
  option?: ResizeObserverOptions,
) {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const op = option ?? {};
  const { disabled = false, onResize } = op;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const _onResize = useRefCallback(
    (entries: ResizeObserverEntry[], observer: ResizeObserver): void => {
      const target = entries[0].target;
      resizeElem(target as T);
    },
  );

  const resizeElem = useDebounce((elem: T) => {
    const rectOb = elem.getBoundingClientRect();
    const width = rectOb.width;
    const height = rectOb.height;
    const top = rectOb.top;
    const left = rectOb.left;
    const clientWidth = (elem as HTMLElement).clientWidth;
    const clientHeight = (elem as HTMLElement).clientHeight;

    const fixedWidth = Math.floor(width);
    const fixedHeight = Math.floor(height);
    setHeight(fixedHeight);
    setWidth(fixedWidth);
    setClientWidth(clientWidth);
    setClientHeight(clientHeight);
    setTop(top);
    setLeft(left);

    if (onResize) {
      // defer the callback but not defer to next frame
      onResize({
        width: width,
        height: height,
        clientWidth: clientWidth,
        clientHeight: clientHeight,
        top: top,
        left: left,
      });
    }

    return { width, height, top, left, clientWidth, clientHeight };
  }, 300);

  useEffect(() => {
    if (ref.current) resizeElem(ref.current);
    return () => {
      if (resizeObserver.current) resizeObserver.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (disabled) {
      if (resizeObserver.current) resizeObserver.current.disconnect();
    } else {
      if (resizeObserver.current == null)
        resizeObserver.current = new ResizeObserver(_onResize);

      if (ref.current && resizeObserver.current) {
        resizeObserver.current.observe(ref.current);
      }
    }
  }, [disabled, ref.current]);

  return { width, height, clientHeight, clientWidth, top, left };
}

export interface ResizeObserverOptions {
  disabled?: boolean;
  /** Trigger if element resized. Will always trigger when first time render. */
  onResize?: (size: {
    width: number;
    height: number;
    clientWidth: number;
    clientHeight: number;
    top: number;
    left: number;
  }) => void;
}
