import { OverridableStringUnion } from '@mui/types';

/**
 * default color-schemes
 */
export type DefaultColorScheme = 'light' | 'dark';

export interface ColorSchemeOverrides {}
export type ExtendedColorScheme = OverridableStringUnion<
  never,
  ColorSchemeOverrides
>;
