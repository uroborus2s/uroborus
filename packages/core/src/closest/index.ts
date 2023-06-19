const findIndex = <T>(list: Array<T>, predicate: (value: T) => boolean) => {
  let index = -1;
  if (list.findIndex) index = list.findIndex(predicate);
  else {
    for (let i = 0; i < list.length; i += 1) {
      if (predicate(list[i])) {
        index = i;
      }
    }
  }
  if (index !== -1) return list[index];
  return undefined;
};

export const find = <T>(list: Array<T>, predicate: (value: T) => boolean) => {
  if (list.find) return list.find(predicate);

  return findIndex(list, predicate);
};

const closestPolyfill = (
  el: Element | null,
  selector: string,
): Element | null => {
  if (el) {
    const supportedMatchesName =
      typeof document === 'undefined'
        ? 'matches'
        : find(
            ['matches', 'msMatchesSelector', 'webkitMatchesSelector'],
            (name: string) => name in Element.prototype,
          ) || 'matches';
    if (
      supportedMatchesName in el &&
      el[supportedMatchesName as 'matches'](selector)
    ) {
      return el;
    }
    // recursively look up the tree
    return closestPolyfill(el.parentElement, selector);
  }
  return null;
};

export default function closest(
  el: Element | null,
  selector: string,
): Element | null {
  // Using native closest for maximum speed where we can
  if (el && el.closest) {
    return el.closest(selector);
  }
  // ie11: damn you!
  return closestPolyfill(el, selector);
}
