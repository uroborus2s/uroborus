import animate from '@/core/util/animate';
import { PaneInProps, TabInProps } from '@ibr/ibr-tabs/index';
import { createContext, SetStateAction } from 'react';
import { atom } from 'recoil';

export const ActiveTabKey = createContext({
  activeKey: '',
  setActiveKey: (v: SetStateAction<string>) => {
    console.log('error', v);
  },
});

export function findTabIndex(
  tabs: Array<TabInProps> | Array<PaneInProps>,
  activeKey: string | undefined,
  orgIndex = 0,
): number {
  let index = tabs.findIndex((tab) => tab.key === activeKey);
  if (index == -1) {
    index = Math.max(0, Math.min(orgIndex, tabs.length - 1));
  }
  return index;
}

export function scroll(
  scrollValue: number,
  element: Element,
  property: 'scrollTop' | 'scrollLeft',
  { animation = true } = {},
) {
  if (element) {
    if (animation) {
      animate(property, element as HTMLDivElement, scrollValue);
    } else {
      (element as HTMLDivElement)[property] = scrollValue;
    }
  }
}
