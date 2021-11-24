import { BasicTarget, getTargetElement, TargetElement } from '@/core/util/dom';
import { DebouncedFunc } from 'lodash';
import throttle from 'lodash.throttle';
import debounce from 'lodash.debounce';
import { useLayoutEffect, useRef } from 'react';
import ResizeObserver from 'resize-observer-polyfill';
import useRafState from '../useRafState';

type Size = {
  offsetWidth: number;
  offsetHeight: number;
  clientWdith: number;
  clientHeight: number;
};

type OnResizeFun = (
  size: {
    width: number;
    height: number;
    offsetWidth: number;
    offsetHeight: number;
  },
  element: HTMLElement,
) => void;

const getElement = (target: BasicTarget<TargetElement>) => {
  let el = getTargetElement(target);
  if (el instanceof Window) {
    el = el.document.body;
  }
  if (el instanceof Document) {
    el = el.body;
  }

  return el;
};

export default function (
  target: BasicTarget<TargetElement>,
  onResize?: OnResizeFun,
  options?: {
    wait: number;
    leading?: boolean;
    trailing?: boolean;
    maxWait?: number;
    type?: 'throttle' | 'debounce';
  },
): Size {
  const [state, setState] = useRafState(() => {
    const el = getElement(target) as HTMLDivElement;
    return {
      offsetWidth: el ? el.offsetWidth : 0,
      offsetHeight: el ? el.offsetHeight : 0,
      clientWdith: el ? el.clientWidth : 0,
      clientHeight: el ? el.clientHeight : 0,
    };
  });

  const throttleRef = useRef<DebouncedFunc<OnResizeFun> | OnResizeFun>();

  useLayoutEffect(() => {
    const el = getElement(target);

    if (!el) {
      return;
    }

    const resizeObserver = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        const elem = entry.target as HTMLElement;
        if (throttleRef.current)
          throttleRef.current(
            {
              width: elem.clientWidth,
              height: elem.clientHeight,
              offsetHeight: elem.offsetHeight,
              offsetWidth: elem.offsetWidth,
            },
            elem,
          );
        setState({
          offsetWidth: elem.offsetWidth,
          offsetHeight: elem.offsetHeight,
          clientHeight: elem.clientHeight,
          clientWdith: elem.clientWidth,
        });
      });
    });

    resizeObserver.observe(el);
    if (onResize) {
      if (options && typeof options === 'object' && options.wait) {
        if (options.type == 'throttle')
          throttleRef.current = throttle(onResize, options.wait, {
            leading: options.leading == undefined ? true : options.leading,
            trailing: options.trailing == undefined ? true : options.trailing,
          });
        else
          throttleRef.current = debounce(onResize, options.wait, {
            leading: options.leading == undefined ? false : options.leading,
            trailing: options.trailing == undefined ? true : options.trailing,
            maxWait: options.maxWait,
          });
      } else {
        throttleRef.current = onResize;
      }
    }
    return function () {
      resizeObserver.disconnect();
      if (
        throttleRef.current &&
        options &&
        typeof options === 'object' &&
        options.wait
      )
        (throttleRef.current as DebouncedFunc<OnResizeFun>).cancel();
    };
  }, [target]);
  return state;
}
