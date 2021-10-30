import { useRefFun } from '@/core/hooks';
import { BasicTarget, getTargetElement } from '@/core/util';
import { TabsState } from '@ibr/ibr-tabs';
import { ownerDocument } from '@mui/material';
import { KeyboardEvent } from 'react';

const nextItem = (list: HTMLDivElement, item: Element | null) => {
  if (list === item) {
    return list.firstElementChild;
  }

  if (item && item.nextElementSibling) {
    return item.nextElementSibling;
  }

  return list.firstElementChild;
};

const previousItem = (list: HTMLDivElement, item: Element | null) => {
  if (list === item) {
    return list.lastElementChild;
  }

  if (item && item.previousElementSibling) {
    return item.previousElementSibling;
  }

  return list.lastElementChild;
};

const moveFocus = (
  list: HTMLDivElement,
  currentFocus: Element | null,
  traversalFunction: (
    list: HTMLDivElement,
    item: Element | null,
  ) => Element | null,
) => {
  let wrappedOnce = false;
  let nextFocus = traversalFunction(list, currentFocus);

  while (nextFocus) {
    // Prevent infinite loop.
    if (nextFocus === list.firstElementChild) {
      if (wrappedOnce) {
        return;
      }

      wrappedOnce = true;
    } // Same logic as useAutocomplete.js

    const nextFocusDisabled =
      // @ts-ignore
      nextFocus.disabled || nextFocus.getAttribute('aria-disabled') === 'true';

    if (!nextFocus.hasAttribute('tabindex') || nextFocusDisabled) {
      // Move to the next element.
      nextFocus = traversalFunction(list, nextFocus);
    } else {
      (nextFocus as HTMLDivElement).focus();
      return;
    }
  }
};

export default function ({ vertical, rtl }: TabsState, target: BasicTarget) {
  const elem = getTargetElement(target) as HTMLDivElement;

  return useRefFun((event: KeyboardEvent<HTMLDivElement>) => {
    const currentFocus = ownerDocument(elem as Node).activeElement;
    const role = currentFocus?.getAttribute('role');

    if (role !== 'tab') {
      return;
    }

    const previousItemKey = vertical
      ? 'ArrowUp'
      : rtl
      ? 'ArrowRight'
      : 'ArrowLeft';
    const nextItemKey = vertical
      ? 'ArrowDown'
      : rtl
      ? 'ArrowLeft'
      : 'ArrowRight';

    if (elem && currentFocus) {
      switch (event.key) {
        case previousItemKey:
          event.preventDefault();
          moveFocus(elem, currentFocus, previousItem);
          break;

        case nextItemKey:
          event.preventDefault();
          moveFocus(elem, currentFocus, nextItem);
          break;

        case 'Home':
          event.preventDefault();
          moveFocus(elem, null, nextItem);
          break;

        case 'End':
          event.preventDefault();
          moveFocus(elem, null, previousItem);
          break;

        default:
          break;
      }
    }
  });
}
