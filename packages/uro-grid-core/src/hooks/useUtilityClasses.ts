import { composeClasses } from '@uroborus/core';
import {
  generateUtilityClass,
  generateUtilityClasses,
} from '@uroborus/sense/styles';

export interface UseUtilityClasses {
  root: string;
  columnDropList: string;
  unselectable: string;
  resizerWrapper: string;
  topLeft: string;
  top: string;
  topRight: string;
  right: string;
  bottomRight: string;
  bottom: string;
  bottomLeft: string;
  left: string;
}

export type GridClassesKey = keyof UseUtilityClasses;

export const gridComponentName = 'uroGrid';

function getDataGridUtilityClass(slot: string): string {
  return generateUtilityClass(gridComponentName, slot);
}

export const gridClasses = generateUtilityClasses(gridComponentName, [
  'resizer',
  'resizer-topLeft',
]);

export default <ClassKey extends GridClassesKey>(
  slots: Record<ClassKey, ReadonlyArray<string | false | undefined | null>>,
) => {
  return composeClasses(slots, getDataGridUtilityClass, {});
};
