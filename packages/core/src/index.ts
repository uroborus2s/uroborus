export {
  last,
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
  shallowEqual,
  invariant,
  doOnce,
  values,
  includes,
  toNumber,
  toBoolean,
  isTrue,
  toDecimalNumber,
  toHump,
  toLine,
  getBigrams,
  stringDistances,
  stringWeightedDistances,
  fuzzySuggestions,
  fuzzyCheckStrings,
  NumberSequence,
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
  FOCUSABLE_SELECTOR,
  FOCUSABLE_EXCLUDE,
  format,
  isHtmlElement,
  isProduction,
  getBodyElement,
  runChecks,
  checkDoctype,
  checkReactVersion,
  noop,
  localStorageAvailable,
  getCookie,
  getDocumentElement,
} from './util/index.js';

export {
  EventService,
  bindEvents,
  type WINDOWEventBinding,
} from './event/index.js';

export type {
  Event,
  FunctionHandler,
  EventFunction,
  EventType,
} from './event/event.types.js';

export {
  FrameworkOverrides,
  type IFrameworkOverrides,
} from './event/frameworkOverrides.js';

export { asap } from './asap/index.js';

export * as timings from './timings/index.js';

export { default as closest, find } from './closest/index.js';

// @mui/utils
export {
  unstable_capitalize as capitalize,
  deepmerge,
  unstable_generateUtilityClass,
  unstable_generateUtilityClasses,
  unstable_composeClasses as composeClasses,
  unstable_useForkRef as useForkRef,
  type GlobalStateSlot,
} from '@mui/utils';

// @mui/types
export type {
  OverridableStringUnion,
  DistributiveOmit,
  OverridableTypeMap,
} from '@mui/types';

export { default as rafSchd } from 'raf-schd';

export {
  default as Logurs,
  type Logger,
  type LogLevel,
} from './logger/index.js';
