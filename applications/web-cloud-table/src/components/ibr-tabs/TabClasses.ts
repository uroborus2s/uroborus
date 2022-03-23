import generateUtilityClass from '@mui/base/generateUtilityClass';
import generateUtilityClasses from '@mui/base/generateUtilityClasses';

const TabSlots = [
  /** 应用于根元素的样式。*/
  'root',
  /** 应用于根元素的样式(如果`tabPosition='left'|'right'`)。*/
  'vertical',
  /** 应用于holder元素的样式*/
  'holder',
  /** 应用于 flex content 元素的样式*/
  'flexContent',
  /** 应用于 flex content 元素的animated样式*/
  'contentAnimated',
  'content-top',
  'content-bottom',
  'content-left',
  'content-right',
  /** 应用于 pane 元素的animated样式*/
  'pane',
  'paneActive',
  'tabNav',
  'tabHeader',
  'centered',
  'extra',
  'navWrap',
  'scroller',
  'tabContainer',
  'scrollButtons',
  'inkBar',
  'verticalInkBar',
  'tabNode',
  'tabActive',
  'tabDisabled',
  'moreButton',
] as const;

export type TabsClassKey = typeof TabSlots[number];

export type TabsClasses = Record<TabsClassKey, string>;

export const TabComponentName = 'IuiTabs';

export function getTabsUtilityClass(slot: string) {
  return generateUtilityClass(TabComponentName, slot);
}

const tabsClasses = generateUtilityClasses(TabComponentName, [...TabSlots]);
export default tabsClasses;
