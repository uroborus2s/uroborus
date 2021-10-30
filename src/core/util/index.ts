export function isDocumentVisible() {
  if (
    typeof document !== 'undefined' &&
    typeof document.visibilityState !== 'undefined'
  ) {
    return document.visibilityState !== 'hidden';
  }

  return true;
}

export function isOnline() {
  if (typeof navigator.onLine !== 'undefined') {
    return navigator.onLine;
  }

  return true;
}

export { default as limit } from './limit';
export { default as subscribeVisible } from './windowVisible';
export { setCache, getCache } from './cache';
export * from './color';
export * from './dom';
export * from './icons';
