import generateUtilityClass from '@mui/base/generateUtilityClass';
import generateUtilityClasses from '@mui/base/generateUtilityClasses';

const slots = ['root', 'content'] as const;

export type VariablesizelistClassesKey = typeof slots[number];

export type VariablesizelistClasses = Record<
  VariablesizelistClassesKey,
  string
>;

export function getVariablesizelistUtilityClass(slot: string) {
  return generateUtilityClass('IuiVirtualList', slot);
}

const variablesizelistClasses = generateUtilityClasses('IuiVirtualList', [
  ...slots,
]);
export default variablesizelistClasses;
