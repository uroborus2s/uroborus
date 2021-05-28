import { MutableRefObject, useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import useRefCallback from '@/util/hooks/useRefCallback';

export default function <T extends HTMLElement = HTMLElement>(
  ref: MutableRefObject<T | undefined>,
  option?: ResizeObserverOptions,
) {
  const resizeObserver = useRef<ResizeObserver | null>(null);
  const op = option ?? {};
  const { disabled = false, onResize } = op;
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [clientWidth, setClientWidth] = useState(0);
  const [clientHeight, setClientHeight] = useState(0);

  const _onResize = useRefCallback(
    (entries: ResizeObserverEntry[], observer: ResizeObserver): void => {
      const target = entries[0].target;
      const rectOb = target.getBoundingClientRect();
      const width = rectOb.width;
      const height = rectOb.height;
      const clientWidth = (target as HTMLElement).clientWidth;
      const clientHeight = (target as HTMLElement).clientHeight;

      const fixedWidth = Math.floor(width);
      const fixedHeight = Math.floor(height);

      setHeight(fixedHeight);
      setWidth(fixedWidth);
      setClientWidth(clientWidth);
      setClientHeight(clientHeight);

      if (onResize) {
        // defer the callback but not defer to next frame
        onResize({
          width: fixedHeight,
          height: fixedWidth,
          clientWidth: clientWidth,
          clientHeight: clientHeight,
        });
      }
    },
  );

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
    return () => {
      if (resizeObserver.current) resizeObserver.current.disconnect();
    };
  }, [disabled]);

  return { width, height, clientHeight, clientWidth };
}

export interface ResizeObserverOptions {
  disabled?: boolean;
  /** Trigger if element resized. Will always trigger when first time render. */
  onResize?: (size: {
    width: number;
    height: number;
    clientWidth: number;
    clientHeight: number;
  }) => void;
}
