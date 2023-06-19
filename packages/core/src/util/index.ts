export { shallowEqual } from './shallowEqual.js';
export { isProduction, invariant } from './invariant.js';
export { last } from './array.js';
export {
  getBrowserInfo,
  isBrowser,
  isBrowserIE,
  isBrowserSafari,
  isBrowserEdge,
  isBrowserChrome,
  isBrowserFirefox,
  isMacOsUserAgent,
  isIOSUserAgent,
  browserSupportsPreventScroll,
  getScrollbarWidth,
  getTargetElement,
  getTabIndex,
  isHtmlElement,
  getBodyElement,
  getCookie,
  getDocumentElement,
} from './browser.js';
export {
  doOnce,
  values,
  includes,
  toNumber,
  toBoolean,
  isTrue,
  toDecimalNumber,
  toHump,
  toLine,
} from './functions.js';

export {
  getBigrams,
  stringDistances,
  stringWeightedDistances,
  fuzzySuggestions,
  fuzzyCheckStrings,
} from './fuzzyMatch.js';

export { NumberSequence } from './numberSequence.js';

export {
  iterateObject,
  exists,
  missing,
  missingOrEmptyObject,
  isObject,
  isFunction,
  isString,
  isBoolean,
  isNumber,
  isUndef,
} from './object.js';

export { FOCUSABLE_SELECTOR, FOCUSABLE_EXCLUDE } from './dom.js';

export { format } from './format.js';

export { default as runChecks } from './runChecks.js';

export { default as checkDoctype } from './checkDoctype.js';

export { default as checkReactVersion } from './checkReactVersion.js';

export { default as localStorageAvailable } from './localStorageAvailable.js';

export { noop } from './empty.js';
