import { useRefFun } from '@/core/hooks';
import { BasicTarget, getTargetElement } from '@/core/util';
import { TabsState } from '@ibr/ibr-tabs';
import React from 'react';

export default function ({ vertical, rtl }: TabsState, target: BasicTarget) {
  const [inkState, setInkState] = React.useState({
    length: 0,
    top: 0,
    left: 0,
  });

  const tabsList = getTargetElement(target);

  const updateInkbarState = useRefFun((index: number) => {
    const currentTab = (tabsList as HTMLDivElement).children[index];
    const { left, bottom, right, top } = currentTab.getBoundingClientRect();
    const width = currentTab.clientWidth;
    const height = currentTab.clientHeight;
    setInkState({
      length: vertical ? height : width,
      top: vertical ? top : bottom + 2,
      left: vertical ? (rtl ? left - 2 : right + 2) : left,
    });
  });

  return { inkState, updateInkbarState };
}
