import { useRefFun } from '@/core/hooks';
import { BasicTarget, getTargetElement } from '@/core/util';
import { TabsState } from '@ibr/ibr-tabs';
import { useState } from 'react';

export default function (
  { vertical, rtl, tabPosition }: TabsState,
  target: BasicTarget,
) {
  const [inkState, setInkState] = useState({
    length: 0,
    top: 0,
    left: 0,
  });

  const tabsList = getTargetElement(target);

  const updateInkbarState = useRefFun((index: number) => {
    const currentTab = (tabsList as HTMLDivElement).children[index];
    const {
      left,
      bottom,
      right,
      top,
      height: tabHeight,
      width: tabWidth,
    } = currentTab.getBoundingClientRect();
    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;
    setInkState({
      length: vertical ? height : width,
      top: vertical
        ? top
        : tabPosition == 'top'
        ? bottom - tabHeight / 4
        : top + tabHeight / 4,
      left: vertical
        ? tabPosition == 'right'
          ? rtl
            ? left + tabWidth / 4
            : right - tabWidth / 4
          : rtl
          ? right - tabWidth / 4
          : left + tabWidth / 4
        : left,
    });
  });

  return { inkState, updateInkbarState };
}
