import { useRefFun } from '@/core/hooks';
import { BasicTarget, getTargetElement } from '@/core/util';
import { useState } from 'react';
import { TabsState } from '../index';

export default function ({ vertical, rtl }: TabsState, target: BasicTarget) {
  const elem = getTargetElement(target);

  const [displayScroll, setDisplayScroll] = useState({
    prev: false,
    next: false,
  });

  const updateScrollButtonState = useRefFun(() => {
    if (elem) {
      const {
        scrollTop,
        scrollHeight,
        clientHeight,
        scrollWidth,
        clientWidth,
        scrollLeft,
      } = elem as HTMLDivElement;
      let showStartScroll;
      let showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < scrollHeight - clientHeight - 1;
      } else {
        showStartScroll = rtl
          ? scrollLeft < scrollWidth - clientWidth - 1
          : scrollLeft > 1;
        showEndScroll = rtl
          ? scrollLeft > 1
          : scrollLeft < scrollWidth - clientWidth - 1;
      }

      if (
        showStartScroll !== displayScroll.prev ||
        showEndScroll !== displayScroll.next
      ) {
        setDisplayScroll({
          prev: showStartScroll,
          next: showEndScroll,
        });
      }
    }
  });

  return { displayScroll, updateScrollButtonState };
}
