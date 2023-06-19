import { createBreakpoints, createSpacing } from '@mui/system';
import type { BreakpointsOptions, SpacingOptions } from '@mui/system';
import { deepmerge } from '@uroborus/core';

import type { Components } from './components.js';
import type {
  ColorSystem,
  DefaultColorScheme,
  ExtendedColorScheme,
  Focus,
  Theme,
  ThemeScales,
  TypographySystem,
  VariantOverrides,
  Variants,
} from './types/index.js';
import {
  createColorSchemes,
  createFocus,
  createTypography,
  createVariants,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
  ColorInversionConfig,
  radius,
  createShadow,
} from './types/index.js';

type Partial2Level<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J];
      }
    : T[K];
};

type Partial3Level<T> = {
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J] extends Record<any, any>
      ? {
          [P in keyof T[K][J]]?: T[K][J][P];
        }
      : T[K][J];
  };
};

export interface ColorSystemOptions extends Partial3Level<ColorSystem> {}

// Use Partial2Level instead of PartialDeep because nested value type is CSSObject which does not work with PartialDeep.
export interface CssVarsThemeOptions extends Partial2Level<ThemeScales> {
  /**
   * Prefix of the generated CSS variables
   * @default 'joy'
   * @example extendTheme({ cssVarPrefix: 'foo-bar' })
   * // { ..., typography: { body1: { fontSize: 'var(--foo-bar-fontSize-md)' } }, ... }
   *
   */
  focus?: Partial<Focus>;
  typography?: Partial<TypographySystem>;
  variants?: Partial2Level<Variants>;
  colorInversion?: Partial2Level<VariantOverrides>;
  colorInversionConfig?: ColorInversionConfig;
  breakpoints?: BreakpointsOptions;
  spacing?: SpacingOptions;
  components?: Components<Theme>;
  colorSchemes?: Partial<
    Record<DefaultColorScheme | ExtendedColorScheme, ColorSystemOptions>
  >;
}

export default function extendTheme(themeOptions?: CssVarsThemeOptions): Theme {
  const {
    breakpoints,
    spacing,
    components: componentsInput,
    variants: variantsInput,
    ...scalesInput
  } = themeOptions || {};

  return {
    colorSchemes: createColorSchemes(),
    get palette() {
      return {
        ...this.colorSchemes.light.palette,
        colorScheme: 'light' as DefaultColorScheme,
      };
    },
    shadowRing: '0 0 #000',
    shadowChannel: '187 187 187',
    get focus() {
      return createFocus(this);
    },
    radius,
    get shadow() {
      return createShadow(this);
    },
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    letterSpacing,
    get typography() {
      return createTypography(this);
    },
    get variants() {
      return deepmerge(createVariants(this), variantsInput);
    },
    breakpoints: createBreakpoints(breakpoints ?? {}),
    spacing: createSpacing(spacing),
    getColorSchemeSelector: () => '&',
  };
}
