import {
  unstable_generateUtilityClasses,
  unstable_generateUtilityClass,
} from '@uroborus/core';

export const generateUtilityClass = (componentName: string, slot: string) =>
  unstable_generateUtilityClass(componentName, slot, 'uro');

export const generateUtilityClasses = <T extends string>(
  componentName: string,
  slots: Array<T>,
) => unstable_generateUtilityClasses(componentName, slots, 'uro');
