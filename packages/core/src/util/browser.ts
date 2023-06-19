import { invariant } from './invariant.js';
import { isFunction } from './object.js';

let isSafari: boolean;
let isIE: boolean;
let isEdge: boolean;
let isChrome: boolean;
let isFirefox: boolean;
let isMacOs: boolean;
let isIOS: boolean;
let browserInfo: { name: string; version: number };

/**
 * from https://stackoverflow.com/a/16938481/1388233
 */
export function getBrowserInfo(): { name: string; version: number } {
  if (browserInfo) {
    return browserInfo;
  }
  const { userAgent } = navigator;
  let match =
    userAgent.match(
      /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i,
    ) || [];
  let tem;
  let version: number;

  if (/trident/i.test(match[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(userAgent) || [];
    version = tem[1] != null ? parseFloat(tem[1]) : 0;
    return {
      name: 'IE',
      version,
    };
  }

  if (match[1] === 'Chrome') {
    tem = userAgent.match(/\bOPR|Edge\/(\d+)/);
    if (tem != null) {
      version = tem[1] != null ? parseFloat(tem[1]) : 0;
      return {
        name: 'Opera',
        version,
      };
    }
  }

  match = match[2]
    ? [match[1], match[2]]
    : [navigator.appName, navigator.appVersion, '-?'];
  tem = userAgent.match(/version\/(\d+)/i);

  if (tem != null) {
    match.splice(1, 1, tem[1]);
  }

  const name = match[0];
  version = match[1] != null ? parseFloat(match[1]) : 0;

  browserInfo = { name, version };

  return browserInfo;
}

export function isBrowserIE(): boolean {
  if (isIE === undefined) {
    isIE =
      typeof window !== 'undefined' &&
      typeof window.navigator !== 'undefined' &&
      /Trident\/|MSIE /.test(window.navigator.userAgent);
  }

  return isIE;
}

export function isBrowserSafari(): boolean {
  if (isSafari === undefined) {
    // taken from https://stackoverflow.com/a/23522755/1388233
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }

  return isSafari;
}

export function isBrowserEdge(): boolean {
  if (isEdge === undefined) {
    isEdge = !isBrowserIE() && !!(window as any).StyleMedia;
  }

  return isEdge;
}

export function isBrowserChrome(): boolean {
  if (isChrome === undefined) {
    const win = window as any;
    isChrome =
      (!!win.chrome && (!!win.chrome.webstore || !!win.chrome.runtime)) ||
      (/Chrome/.test(navigator.userAgent) &&
        /Google Inc/.test(navigator.vendor));
  }

  return isChrome;
}

export function isBrowserFirefox(): boolean {
  if (isFirefox === undefined) {
    const win = window as any;

    isFirefox = typeof win.InstallTrigger !== 'undefined';
  }

  return isFirefox;
}

export function isMacOsUserAgent(): boolean {
  const userAgentData = navigator.userAgentData || navigator;
  const { platform } = userAgentData;
  if (isMacOs === undefined) {
    isMacOs = /(Mac|iPhone|iPod|iPad)/i.test(platform);
  }

  return isMacOs;
}

export function isIOSUserAgent(): boolean {
  const userAgentData = navigator.userAgentData || navigator;
  const { platform } = userAgentData;
  if (isIOS === undefined) {
    // taken from https://stackoverflow.com/a/58064481/1388233
    isIOS =
      /iPad|iPhone|iPod/.test(platform) ||
      (platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  }

  return isIOS;
}

export function browserSupportsPreventScroll(): boolean {
  // 除了 safari 之外的所有浏览器都支持 focus({ preventScroll: true })。
  // 此功能已添加到 Safari 15+
  return !isBrowserSafari() || getBrowserInfo().version >= 15;
}

let browserScrollbarWidth: number;

let invisibleScrollbar: boolean;

function initScrollbarWidthAndVisibility(): void {
  const { body } = document;
  const div = document.createElement('div');

  div.style.width = '100px';
  div.style.height = '100px';
  div.style.opacity = '0';
  div.style.overflow = 'scroll';
  (div.style as any).msOverflowStyle = 'scrollbar'; // needed for WinJS apps
  div.style.position = 'absolute';

  body.appendChild(div);

  let width: number | undefined = div.offsetWidth - div.clientWidth;

  // if width is 0 and client width is 0, means the DOM isn't ready
  if (width === 0 && div.clientWidth === 0) {
    width = undefined;
  }

  // remove div
  if (div.parentNode) {
    div.parentNode.removeChild(div);
  }

  if (width !== undefined) {
    browserScrollbarWidth = width;
    invisibleScrollbar = width === 0;
  }
}

export function getScrollbarWidth(): number | undefined {
  if (browserScrollbarWidth === undefined) {
    initScrollbarWidthAndVisibility();
  }
  return browserScrollbarWidth;
}

export const isBrowser = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

interface RefObject<T> {
  current: T;
}

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | RefObject<TargetValue<T>>;

// 读取target的dom对象
export function getTargetElement<T extends TargetType>(
  target: BasicTarget<T>,
  defaultElement?: T,
) {
  if (!isBrowser) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (isFunction(target)) {
    targetElement = target();
  } else if ('current' in target) {
    targetElement = target.current;
  } else {
    targetElement = target;
  }

  return targetElement;
}

// 读取dom的tabindex
export function getTabIndex(el: HTMLElement | null): string | null {
  if (!el) {
    return null;
  }

  const numberTabIndex = el.tabIndex;
  const tabIndex = el.getAttribute('tabIndex');

  if (
    numberTabIndex === -1 &&
    (tabIndex === null || (tabIndex === '' && !isBrowserFirefox()))
  ) {
    return null;
  }

  return numberTabIndex.toString();
}

// 从dom获取window对象
export const getWindowFromEl = (el?: Element | null) =>
  el && el.ownerDocument ? el.ownerDocument.defaultView : window;

// 判断是否html对象
export const isHtmlElement = (el: any) =>
  getWindowFromEl(el) &&
  (typeof Element === 'object'
    ? el instanceof HTMLElement
    : el &&
      typeof el === 'object' &&
      el.nodeType === 1 &&
      typeof el.nodeName === 'string');

// 获取浏览器body对象
export const getBodyElement = () => {
  const { body } = document;
  invariant(body, 'Cannot find document.body');
  return body;
};

export const getDocumentElement = () => {
  const doc = document.documentElement;
  invariant(doc, 'Cannot find document.documentElement');
  return doc;
};

// 读取页面的cookie
export const getCookie = (key: string) => {
  const { cookie } = document;
  return cookie.match(new RegExp(`${key}=(?<key>\\w+)`))?.groups?.key;
};

// 设置页面的cookie
export const setCookie = (key: string, value: string, days?: number) => {
  let expires = '';
  if (days) {
    if (days > 0) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    } else {
      expires = '; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    }
  }
  document.cookie = `${key}=${value || ''}${expires}; path=/`;
};
