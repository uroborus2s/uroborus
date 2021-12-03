import generateUtilityClass from '@mui/base/generateUtilityClass';
import generateUtilityClasses from '@mui/base/generateUtilityClasses';

const Slots = [
  /** 应用于根元素的样式。*/
  'root',
  'dragDiver',
  'dragDiverPress',
] as const;

export type GridTableClassKey = typeof Slots[number];

export type GridTableClasses = Record<GridTableClassKey, string>;

export const GridTableComponentName = 'IuiGrid';

export function getGridTableUtilityClass(slot: string) {
  return generateUtilityClass(GridTableComponentName, slot);
}

const gridTableClasses = generateUtilityClasses(GridTableComponentName, [
  ...Slots,
]);
export default gridTableClasses;
