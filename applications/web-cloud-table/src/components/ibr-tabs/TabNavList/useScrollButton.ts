import { useRefFun } from '@/core/hooks';
import { BasicTarget, getTargetElement } from '@/core/util';
import { useState } from 'react';
import { TabsState } from '../index';

export default function (
  { vertical, rtl }: TabsState,
  outer: BasicTarget,
  inline: BasicTarget,
) {
  const [displayScroll, setDisplayScroll] = useState({
    prev: false,
    next: false,
  });

  const updateScrollButtonState = useRefFun(() => {
    const outerElem = getTargetElement(outer);
    const inlineElem = getTargetElement(inline) as HTMLDivElement;

    if (outerElem && inlineElem) {
      const { scrollTop, clientHeight, clientWidth, scrollLeft } =
        outerElem as HTMLDivElement;

      const { clientHeight: listHeight, clientWidth: listWidth } =
        inlineElem as HTMLDivElement;
      let showStartScroll;
      let showEndScroll;

      if (vertical) {
        showStartScroll = scrollTop > 1;
        showEndScroll = scrollTop < listHeight - clientHeight - 1;
      } else {
        showStartScroll = rtl
          ? scrollLeft < listWidth - clientWidth - 1
          : scrollLeft > 1;
        showEndScroll = rtl
          ? scrollLeft > 1
          : scrollLeft < listWidth - clientWidth - 1;
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
