import type { OverridableStringUnion } from '@uroborus/core';

export interface ColorSchemeOverrides {}
export type ExtendedColorScheme = OverridableStringUnion<
  never,
  ColorSchemeOverrides
>;

/**
 * default color-schemes
 */
export type DefaultColorScheme = 'light' | 'dark' | ExtendedColorScheme;
