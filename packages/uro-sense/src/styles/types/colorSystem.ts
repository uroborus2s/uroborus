import { colorChannel } from '@mui/system';
import type { OverridableStringUnion } from '@uroborus/core';

import {
  evolutionColor,
  blue,
  common,
  green,
  grey,
  isColorKey,
  purple,
  red,
  yellow,
} from '../colors/index.js';
import type { Color, ColorKey } from '../colors/index.js';

import type { DefaultColorScheme, ExtendedColorScheme } from './colorScheme.js';

/**
 * ====================================================
 * Developer facing types, they can augment these types.
 * ====================================================
 */
export interface PaletteVariant {
  plainColor: string;
  plainBg: string;
  plainBorder: string;
  // hover state
  plainHoverColor: string;
  plainHoverBorder: string;
  plainHoverBg: string;
  // active state
  plainActiveColor: string;
  plainActiveBorder: string;
  plainActiveBg: string;
  // disabled state
  plainDisabledColor: string;
  plainDisabledBorder: string;
  plainDisabledBg: string;

  outlinedColor: string;
  outlinedBorder: string;
  outlinedBg: string;
  // hover state
  outlinedHoverColor: string;
  outlinedHoverBorder: string;
  outlinedHoverBg: string;
  // active state
  outlinedActiveColor: string;
  outlinedActiveBorder: string;
  outlinedActiveBg: string;
  // disabled state
  outlinedDisabledColor: string;
  outlinedDisabledBorder: string;
  outlinedDisabledBg: string;

  softColor: string;
  softBorder: string;
  softBg: string;
  // hover state
  softHoverColor: string;
  softHoverBorder: string;
  softHoverBg: string;
  // active state
  softActiveColor: string;
  softActiveBorder: string;
  softActiveBg: string;
  // disabled state
  softDisabledColor: string;
  softDisabledBorder: string;
  softDisabledBg: string;

  solidColor: string;
  solidBg: string;
  solidBorder: string;
  // hover state
  solidHoverColor: string;
  solidHoverBg: string;
  solidHoverBorder: string;
  // active state
  solidActiveColor: string;
  solidActiveBg: string;
  solidActiveBorder: string;
  // disabled state
  solidDisabledColor: string;
  solidDisabledBg: string;
  solidDisabledBorder: string;
}

export interface PaletteRangeOverrides {}

export type ExtendedPaletteRange = OverridableStringUnion<
  'mainChannel' | 'lightChannel' | 'darkChannel',
  PaletteRangeOverrides
>;

export interface PaletteRange
  extends Record<ExtendedPaletteRange, string>,
    Partial<PaletteVariant> {
  color: Color;
}

export interface PaletteCommon {
  white: string;
  black: string;
}

export interface PaletteText {
  primary: string;
  secondary: string;
  tertiary: string;
}
export interface PaletteBackground {
  body: string;
  level1: string;
  level2: string;
  level3: string;
}

export interface ColorPalettePropOverrides {}

export type DefaultColorPalette =
  | 'primary'
  | 'neutral'
  | 'danger'
  | 'info'
  | 'success'
  | 'warning';

export type ColorPaletteProp = OverridableStringUnion<
  DefaultColorPalette,
  ColorPalettePropOverrides
>;

// Split interfaces into multiple chunks so that they can be augmented independently

export type PalettePrimary = PaletteRange;
export type PaletteNeutral = PaletteRange;
export type PaletteDanger = PaletteRange;
export type PaletteInfo = PaletteRange;
export type PaletteSuccess = PaletteRange;
export type PaletteWarning = PaletteRange;

export interface Palette {
  mode: DefaultColorScheme;
  primary: PalettePrimary;
  neutral: PaletteNeutral;
  danger: PaletteDanger;
  info: PaletteInfo;
  success: PaletteSuccess;
  warning: PaletteWarning;
  common: PaletteCommon;
  text: PaletteText;
  background: PaletteBackground;
  divider: string;
  focusVisible: string;
}

export interface ColorSystem {
  palette: Palette;
  shadowRing: string;
  shadowChannel: string;
}

export const createPalette = (
  mode: DefaultColorScheme | ExtendedColorScheme,
): Palette => {
  const colorFeatures = {
    primary: blue,
    neutral: grey,
    danger: red,
    info: purple,
    success: green,
    warning: yellow,
  };

  const createModelPalette = (
    mod: 'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning',
  ) => {
    const color = colorFeatures[mod];

    const getColor = (
      options: Partial<
        Record<
          'primary' | 'neutral' | 'danger' | 'info' | 'success' | 'warning',
          { lightColor?: ColorKey | string; darkColor?: ColorKey | string }
        >
      > &
        Record<
          'default',
          { lightColor: ColorKey | string; darkColor: ColorKey | string }
        >,
    ) => {
      let { lightColor, darkColor } = options[mod] || {};
      const { lightColor: defaultLight, darkColor: defaultDark } =
        options.default;
      lightColor = lightColor || defaultLight;
      darkColor = darkColor || defaultDark;
      const light = isColorKey(lightColor) ? color[lightColor] : lightColor;
      const dark = isColorKey(darkColor) ? color[darkColor] : darkColor;
      return mode === 'light' ? light : dark;
    };

    return {
      color,
      plainColor: getColor({
        neutral: { lightColor: '800', darkColor: '200' },
        warning: { lightColor: '800' },
        default: {
          lightColor: '600',
          darkColor: '300',
        },
      }),
      plainHoverColor: getColor({
        default: {
          lightColor: '900',
          darkColor: '50',
        },
      }),
      plainHoverBg: getColor({
        warning: { lightColor: '50' },
        default: {
          lightColor: '100',
          darkColor: '800',
        },
      }),
      plainActiveBg: getColor({
        default: {
          lightColor: '200',
          darkColor: '700',
        },
      }),
      plainDisabledColor: getColor({
        neutral: { lightColor: '300', darkColor: '700' },
        default: {
          lightColor: '200',
          darkColor: '800',
        },
      }),

      outlinedColor: getColor({
        neutral: { lightColor: '800', darkColor: '200' },
        warning: { lightColor: '800' },
        default: {
          lightColor: '500',
          darkColor: '200',
        },
      }),
      outlinedBorder: getColor({
        neutral: { lightColor: '200', darkColor: '800' },
        default: {
          lightColor: '200',
          darkColor: '700',
        },
      }),
      outlinedHoverColor: getColor({
        default: {
          lightColor: '900',
          darkColor: '50',
        },
      }),
      outlinedHoverBg: getColor({
        warning: { lightColor: '50' },
        default: {
          lightColor: '100',
          darkColor: '800',
        },
      }),
      outlinedHoverBorder: getColor({
        neutral: { lightColor: '300', darkColor: '700' },
        default: {
          lightColor: '300',
          darkColor: '600',
        },
      }),
      outlinedActiveBg: getColor({
        neutral: { lightColor: '200', darkColor: '800' },
        default: {
          lightColor: '200',
          darkColor: '900',
        },
      }),
      outlinedDisabledColor: getColor({
        neutral: { lightColor: '300', darkColor: '800' },
        default: {
          lightColor: '100',
          darkColor: '800',
        },
      }),
      outlinedDisabledBorder: getColor({
        default: {
          lightColor: '100',
          darkColor: '800',
        },
      }),

      softColor: getColor({
        neutral: { lightColor: '800', darkColor: '200' },
        warning: { lightColor: '800' },
        default: {
          lightColor: '600',
          darkColor: '200',
        },
      }),
      softBg: getColor({
        neutral: { lightColor: '100', darkColor: '800' },
        warning: { lightColor: '50' },
        default: {
          lightColor: '100',
          darkColor: '900',
        },
      }),
      softHoverColor: getColor({
        default: {
          lightColor: '900',
          darkColor: '50',
        },
      }),
      softHoverBg: getColor({
        neutral: { lightColor: '200', darkColor: '700' },
        warning: { lightColor: '100' },
        default: {
          lightColor: '200',
          darkColor: '800',
        },
      }),
      softActiveBg: getColor({
        neutral: { lightColor: '300', darkColor: '600' },
        warning: { lightColor: '200' },
        default: {
          lightColor: '300',
          darkColor: '700',
        },
      }),
      softDisabledColor: getColor({
        neutral: { lightColor: '300', darkColor: '700' },
        warning: { lightColor: '200' },
        default: {
          lightColor: '300',
          darkColor: '800',
        },
      }),
      softDisabledBg: getColor({
        warning: { lightColor: '50', darkColor: '600' },
        default: {
          lightColor: '50',
          darkColor: '900',
        },
      }),

      solidColor: getColor({
        warning: { lightColor: '800', darkColor: common.black },
        success: { darkColor: common.white },
        default: {
          lightColor: common.white,
          darkColor: common.white,
        },
      }),
      solidBg: getColor({
        success: { darkColor: '600' },
        warning: { lightColor: '200', darkColor: '300' },
        neutral: { lightColor: '600', darkColor: '600' },
        default: {
          lightColor: '500',
          darkColor: '600',
        },
      }),
      solidHoverBg: getColor({
        success: { darkColor: '700' },
        neutral: { lightColor: '700', darkColor: '700' },
        warning: { lightColor: '300', darkColor: '400' },
        default: {
          lightColor: '600',
          darkColor: '700',
        },
      }),
      solidActiveBg: getColor({
        success: { darkColor: '800' },
        warning: { lightColor: '400', darkColor: '500' },
        neutral: { lightColor: '800', darkColor: '800' },
        default: {
          lightColor: '700',
          darkColor: '800',
        },
      }),
      solidDisabledColor: getColor({
        warning: { lightColor: '400' },
        neutral: { lightColor: '300', darkColor: '700' },
        default: {
          lightColor: common.white,
          darkColor: '700',
        },
      }),
      solidDisabledBg: getColor({
        warning: { lightColor: '50' },
        neutral: { lightColor: '50', darkColor: '900' },
        default: {
          lightColor: '200',
          darkColor: '900',
        },
      }),
      mainChannel: colorChannel(color['500']),
      lightChannel: colorChannel(color['200']),
      darkChannel: colorChannel(color['800']),
    };
  };

  const neutral = createModelPalette('neutral');

  const restPalette = (() => {
    if (mode === 'light')
      return {
        text: {
          primary: neutral.color['800'],
          secondary: neutral.color['600'],
          tertiary: neutral.color['500'],
        },
        background: {
          body: common.white,
          surface: common.white,
          level1: neutral.color['50'],
          level2: neutral.color['100'],
          level3: neutral.color['200'],
          tooltip: neutral.color['800'],
          backdrop: evolutionColor(`rgb(255,255,255)`, 0.5),
        },
      };
    return {
      text: {
        primary: neutral.color['100'],
        secondary: neutral.color['300'],
        tertiary: neutral.color['400'],
      },
      background: {
        body: neutral.color['900'],
        surface: common.black,
        level1: neutral.color['800'],
        level2: neutral.color['700'],
        level3: neutral.color['600'],
        tooltip: neutral.color['600'],
        backdrop: evolutionColor(`rgb(${neutral.darkChannel})`, 0.5),
      },
    };
  })();

  return {
    mode,
    primary: createModelPalette('primary'),
    neutral,
    danger: createModelPalette('danger'),
    info: createModelPalette('info'),
    success: createModelPalette('success'),
    warning: createModelPalette('warning'),
    common,
    ...restPalette,
    divider:
      mode === 'light'
        ? evolutionColor(`rgb(${neutral.mainChannel})`, 0.28)
        : evolutionColor(`rgb(${neutral.mainChannel})`, 0.24),
    focusVisible: colorFeatures.primary['500'],
  };
};

export const createColorSchemes = () => ({
  light: {
    palette: createPalette('light'),
    shadowRing: '0 0 #000',
    shadowChannel: '187 187 187',
  },
  dark: {
    palette: createPalette('light'),
    shadowRing: '0 0 #000',
    shadowChannel: '0 0 0',
  },
});
