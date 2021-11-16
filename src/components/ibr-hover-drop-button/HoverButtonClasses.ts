import generateUtilityClass from '@mui/core/generateUtilityClass';

const Slots = [
  /** 应用于根元素的样式。*/
  'root',
] as const;

export type HoverButtonClassKey = typeof Slots[number];

export type HoverButtonClasses = Record<HoverButtonClassKey, string>;

export const HoverButtonName = 'IuiHoverButton';

export function getHoverButtonUtilityClass(slot: string) {
  return generateUtilityClass(HoverButtonName, slot);
}
