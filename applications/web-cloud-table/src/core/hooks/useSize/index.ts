import {
  BasicTarget,
  elementHeight,
  elementWidth,
  getTargetElement,
  offsetHeight,
  offsetWidth,
  TargetElement,
} from '@/core/util/dom';
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
  modify?: boolean,
): Size {
  const el = getElement(target);

  const [state, setState] = useRafState(() => ({
    offsetWidth: offsetWidth(el),
    offsetHeight: offsetHeight(el),
    clientWdith: elementWidth(el),
    clientHeight: elementHeight(el),
  }));

  const refState = useRef(state);
  refState.current = state;

  const throttleRef = useRef<DebouncedFunc<OnResizeFun> | OnResizeFun>();

  useLayoutEffect(() => {
    if (!el) {
      return;
    }

    if (onResize && typeof onResize === 'function') {
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

    const resizeObserver = new ResizeObserver(function (entries) {
      entries.forEach(function (entry) {
        const elem = entry.target as HTMLElement;

        const width = elementWidth(elem);
        const height = elementHeight(elem);
        const oHeight = offsetHeight(elem);
        const oWidth = offsetWidth(elem);

        if (throttleRef.current)
          throttleRef.current(
            {
              width,
              height,
              offsetHeight: oHeight,
              offsetWidth: oWidth,
            },
            elem,
          );

        if (!modify) {
          setState({
            offsetWidth: oWidth,
            offsetHeight: oHeight,
            clientHeight: height,
            clientWdith: width,
          });
        }
      });
    });

    resizeObserver.observe(el);

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
  return refState.current;
}
