import type { CSSObject } from '@mui/system';
import type { OverridableStringUnion } from '@uroborus/core';

import { Theme } from './theme.js';

export interface IconSize {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
}

export interface FontSize {
  xs3: string;
  xs2: string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  xl2: string;
  xl3: string;
  xl4: string;
  xl5: string;
  xl6: string;
  xl7: string;
}

export interface FontFamily {
  body: string;
  display: string;
  code: string;
  fallback: string;
}

export interface FontWeight {
  xs: string | number;
  sm: string | number;
  md: string | number;
  lg: string | number;
  xl: string | number;
}

export interface LineHeight {
  sm: string | number;
  md: string | number;
  lg: string | number;
}

export interface LetterSpacing {
  sm: string;
  md: string;
  lg: string;
}

export interface TypographySystemOverrides {}
export type ExtendedTypographySystem = OverridableStringUnion<
  | 'display1'
  | 'display2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'body3'
  | 'body4'
  | 'body5',
  TypographySystemOverrides
>;

export interface TypographySystem
  extends Record<ExtendedTypographySystem, CSSObject> {}

export const fontFamily = {
  fallback:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  get body() {
    return `"Public Sans", ${this.fallback}`;
  },
  get display() {
    return `"Public Sans", ${this.fallback}`;
  },
  code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
};

export const fontSize = {
  xs3: '0.5rem',
  xs2: '0.625rem',
  xs: '0.75rem',
  sm: '0.875rem',
  md: '1rem',
  lg: '1.125rem',
  xl: '1.25rem',
  xl2: '1.5rem',
  xl3: '1.875rem',
  xl4: '2.25rem',
  xl5: '3rem',
  xl6: '3.75rem',
  xl7: '4.5rem',
};

export const fontWeight = {
  xs: 200,
  sm: 300,
  md: 500,
  lg: 600,
  xl: 700,
  xl2: 800,
  xl3: 900,
};

export const lineHeight = {
  sm: 1.25,
  md: 1.5,
  lg: 1.7,
};

export const letterSpacing = {
  sm: '-0.01em',
  md: '0.083em',
  lg: '0.125em',
};

export const createTypography = (theme: Theme) => {
  const getFontFamily = (key: keyof TypographySystem) =>
    /^(display1|display2|h1|h2)&/.test(key)
      ? theme.fontFamily.display
      : theme.fontFamily.body;

  const getFontWeight = (key: keyof TypographySystem) => {
    switch (key) {
      case 'display1':
      case 'display2':
        return theme.fontWeight.xl;
      case 'h1':
      case 'h2':
        return theme.fontWeight.lg;
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return theme.fontWeight.md;
      default:
        return undefined;
    }
  };

  const getFontSize = (key: keyof TypographySystem) => {
    switch (key) {
      case 'display1':
        return theme.fontSize.xl7;
      case 'display2':
        return theme.fontSize.xl6;
      case 'h1':
        return theme.fontSize.xl5;
      case 'h2':
        return theme.fontSize.xl4;
      case 'h3':
        return theme.fontSize.xl3;
      case 'h4':
        return theme.fontSize.xl2;
      case 'h5':
        return theme.fontSize.xl;
      case 'h6':
        return theme.fontSize.lg;
      case 'body1':
        return theme.fontSize.md;
      case 'body2':
        return theme.fontSize.sm;
      case 'body3':
        return theme.fontSize.xs;
      case 'body4':
        return theme.fontSize.xs2;
      case 'body5':
        return theme.fontSize.xs3;
      default:
        return theme.fontSize.md;
    }
  };

  const getLineHeight = (key: keyof TypographySystem) =>
    /^(display1|display2|h1|h2|h3)&/.test(key)
      ? theme.lineHeight.sm
      : theme.lineHeight.md;

  const getColor = (key: keyof TypographySystem) => {
    switch (key) {
      case 'body2':
        return theme.palette.text.secondary;
      case 'body3':
      case 'body4':
      case 'body5':
        return theme.palette.text.tertiary;
      default:
        return theme.palette.text.primary;
    }
  };

  const getLetterSpacing = (key: keyof TypographySystem) =>
    /^(display1|display2|h1|h2)&/.test(key)
      ? theme.letterSpacing.sm
      : undefined;

  const typography: TypographySystem = {} as unknown as TypographySystem;
  (
    [
      'display1',
      'display2',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'body1',
      'body2',
      'body3',
      'body4',
      'body5',
    ] as (keyof TypographySystem)[]
  ).forEach((key) => {
    const weight = getFontWeight(key);
    const letter = getLetterSpacing(key);

    typography[key] = {
      fontFamily: getFontFamily(key),
      fontSize: getFontSize(key),
      lineHeight: getLineHeight(key),
      color: getColor(key),
      ...(weight === undefined ? {} : { fontWeight: weight }),
      ...(letter === undefined ? {} : { letterSpacing: letter }),
    };
  });

  return typography;
};
