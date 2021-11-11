import generateUtilityClass from '@mui/core/generateUtilityClass';
import generateUtilityClasses from '@mui/core/generateUtilityClasses';

const slots = ['root'] as const;

export type BaseIconClassKey = typeof slots[number];

export type BaseIconClasses = Record<BaseIconClassKey, string>;

export const BaseIconComponentName = 'IuiBaseIcon';

export function getBaseIconUtilityClass(slot: string) {
  return generateUtilityClass(BaseIconComponentName, slot);
}

const baseIconClasses = generateUtilityClasses(BaseIconComponentName, [
  ...slots,
]);
export default baseIconClasses;