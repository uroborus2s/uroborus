import { MutableRefObject } from 'react';

export type BasicTarget<T = HTMLElement> =
  | (() => T | null)
  | T
  | null
  | MutableRefObject<T | null | undefined>;

export type TargetElement = HTMLElement | Document | Window;

export function getTargetElement(
  target?: BasicTarget<TargetElement>,
  defaultElement?: TargetElement,
): TargetElement | undefined | null {
  if (!target) {
    return defaultElement;
  }
  let targetElement;

  if (typeof target === 'function') {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

export function elementHeight(element: HTMLElement | undefined | null) {
  return element && element.clientHeight ? element.clientHeight : 0;
}

export function elementWidth(element: HTMLElement | undefined | null) {
  return element && element.clientWidth ? element.clientWidth : 0;
}

export function offsetHeight(element: HTMLElement | undefined | null) {
  return element && element.offsetHeight ? element.offsetHeight : 0;
}

export function offsetWidth(element: HTMLElement | undefined | null) {
  return element && element.offsetWidth ? element.offsetWidth : 0;
}
