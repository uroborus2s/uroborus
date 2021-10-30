import { BasicTarget, getTargetElement } from '@/core/util';
import { TabsState } from '@ibr/ibr-tabs';
import { scroll } from '../core';

export default function (
  { vertical, rtl }: TabsState,
  target1: BasicTarget,
  target2: BasicTarget,
) {
  const container = getTargetElement(target1);
  const item = getTargetElement(target2);

  const clientSize = vertical ? 'clientHeight' : 'clientWidth';
  const scrollStart = vertical ? 'scrollTop' : 'scrollLeft';

  const getScrollSize = () => {
    if (container && item) {
      const containerSize = (container as HTMLDivElement)[clientSize];
      let totalSize = 0;
      const children = Array.from((item as HTMLDivElement).children);

      for (let i = 0; i < children.length; i += 1) {
        const tab = children[i];

        if (totalSize + tab[clientSize] > containerSize) {
          break;
        }

        totalSize += tab[clientSize];
      }

      return totalSize;
    }
    return 0;
  };

  const moveTabsScroll = (delta: number) => {
    if (container) {
      let scrollValue = (container as HTMLDivElement)[scrollStart];

      if (vertical) {
        scrollValue += delta;
      } else {
        scrollValue += delta * (rtl ? -1 : 1);
      }

      scroll(scrollValue, container as HTMLDivElement, scrollStart);
    }
  };

  const handleStartScrollClick = () => {
    moveTabsScroll(-1 * getScrollSize());
  };

  const handleEndScrollClick = () => {
    moveTabsScroll(getScrollSize());
  };

  return { handleEndScrollClick, handleStartScrollClick };
}
