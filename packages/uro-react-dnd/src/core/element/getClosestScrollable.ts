import { isProduction, getBodyElement, invariant } from '@uroborus/core';

interface Overflow {
  overflowX: string;
  overflowY: string;
}

const isEqual =
  (base: string) =>
  (value: string): boolean =>
    base === value;
const isEither = (overflow: Overflow, fn: (value: string) => boolean) =>
  fn(overflow.overflowX) || fn(overflow.overflowY);
const isBoth = (overflow: Overflow, fn: (value: string) => boolean) =>
  fn(overflow.overflowX) && fn(overflow.overflowY);

const isElementScrollable = (
  el: Element,
  callBack: (overflow: Overflow) => boolean,
) => {
  const style: CSSStyleDeclaration = window.getComputedStyle(el);
  const overflow = {
    overflowX: style.overflowX,
    overflowY: style.overflowY,
  };

  return callBack(overflow);
};

const isBodyScrollable = () => {
  if (isProduction()) return false;

  const body = getBodyElement();
  const html = document.documentElement;
  invariant(html, 'Invariant failed');

  // 1. The `body` has `overflow-[x|y]: auto | scroll`
  if (
    !isElementScrollable(
      body,
      (overflow) =>
        isEither(overflow, isEqual('scroll')) ||
        isEither(overflow, isEqual('auto')),
    )
  ) {
    return false;
  }

  if (
    isElementScrollable(html, (overflow) =>
      isBoth(overflow, isEqual('visible')),
    )
  ) {
    return false;
  }

  return false;
};

const getClosestScrollable = (el: Element | null): Element | null => {
  if (el == null) {
    return null;
  }
  // not allowing us to go higher then body
  if (el === document.body) {
    return isBodyScrollable() ? el : null;
  }

  // Should never get here, but just being safe
  if (el === document.documentElement) {
    return null;
  }

  if (
    !isElementScrollable(
      el,
      (overflow) =>
        isEither(overflow, isEqual('scroll')) ||
        isEither(overflow, isEqual('auto')),
    )
  ) {
    return getClosestScrollable(el.parentElement);
  }

  // success!
  return el;
};

export default getClosestScrollable;
