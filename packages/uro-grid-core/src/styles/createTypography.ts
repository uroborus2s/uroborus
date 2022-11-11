import { CSSProperties as ReactCSSProperties } from 'react';
import * as CSS from 'csstype';
import { deepmerge } from '@mui/utils';
import { Palette } from './createPalette';

export type NormalCssProperties = CSS.Properties<number | string>;
export type Fontface = CSS.AtRule.FontFace & {
  fallbacks?: CSS.AtRule.FontFace[];
};

/**
 * Allows the user to augment the properties available
 */
export interface BaseCSSProperties extends NormalCssProperties {
  '@font-face'?: Fontface | Fontface[];
}

export interface CSSProperties extends BaseCSSProperties {
  // Allow pseudo selectors and media queries
  // `unknown` is used since TS does not allow assigning an interface without
  // an index signature to one with an index signature. This is to allow type safe
  // module augmentation.
  // Technically we want any key not typed in `BaseCSSProperties` to be of type
  // `CSSProperties` but this doesn't work. The index signature needs to cover
  // BaseCSSProperties as well. Usually you would use `BaseCSSProperties[keyof BaseCSSProperties]`
  // but this would not allow assigning React.CSSProperties to CSSProperties
  [k: string]: unknown | CSSProperties;
}

export type TypographyStyleOptions = CSSProperties;

export type TypographyStyle = CSSProperties;

export type TypographyOptions = Partial<
  Record<Variant, TypographyStyleOptions> & FontStyleOptions & TypographyUtils
>;

export interface Typography
  extends Record<Variant, TypographyStyle>,
    FontStyle,
    TypographyUtils {}

export type Variant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline';

export type FontStyle = Required<{
  fontFamily: ReactCSSProperties['fontFamily'];
  fontSize: number;
  fontWeightLight: ReactCSSProperties['fontWeight'];
  fontWeightRegular: ReactCSSProperties['fontWeight'];
  fontWeightMedium: ReactCSSProperties['fontWeight'];
  fontWeightBold: ReactCSSProperties['fontWeight'];
  htmlFontSize: number;
}>;

export interface FontStyleOptions extends Partial<FontStyle> {
  allVariants?: ReactCSSProperties;
}

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

const caseAllCaps = {
  textTransform: 'uppercase',
} as ReactCSSProperties;

const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions | ((palette: Palette) => TypographyOptions),
) {
  const {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    htmlFontSize = 16,
    allVariants,
    pxToRem: pxToRem2,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;

  const coef = fontSize / 14;
  const pxToRem =
    pxToRem2 || ((size: number) => `${(size / htmlFontSize) * coef}rem`);

  const buildVariant = (
    fontWeight: ReactCSSProperties['fontWeight'],
    size: number,
    lineHeight: number,
    letterSpacing: number,
    casing?: ReactCSSProperties,
  ) => ({
    fontFamily,
    fontWeight,
    fontSize: pxToRem(size),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight,
    // The letter spacing was designed for the Roboto font-family. Using the same letter-spacing
    // across font-families can cause issues with the kerning.
    ...(fontFamily === defaultFontFamily
      ? { letterSpacing: `${round(letterSpacing / size)}em` }
      : {}),
    ...casing,
    ...allVariants,
  });

  const variants = {
    h1: buildVariant(fontWeightLight, 96, 1.167, -1.5),
    h2: buildVariant(fontWeightLight, 60, 1.2, -0.5),
    h3: buildVariant(fontWeightRegular, 48, 1.167, 0),
    h4: buildVariant(fontWeightRegular, 34, 1.235, 0.25),
    h5: buildVariant(fontWeightRegular, 24, 1.334, 0),
    h6: buildVariant(fontWeightMedium, 20, 1.6, 0.15),
    subtitle1: buildVariant(fontWeightRegular, 16, 1.75, 0.15),
    subtitle2: buildVariant(fontWeightMedium, 14, 1.57, 0.1),
    body1: buildVariant(fontWeightRegular, 16, 1.5, 0.15),
    body2: buildVariant(fontWeightRegular, 14, 1.43, 0.15),
    button: buildVariant(fontWeightMedium, 14, 1.75, 0.4, caseAllCaps),
    caption: buildVariant(fontWeightRegular, 12, 1.66, 0.4),
    overline: buildVariant(fontWeightRegular, 12, 2.66, 1, caseAllCaps),
  };

  return deepmerge(
    {
      htmlFontSize,
      pxToRem,
      fontFamily,
      fontSize,
      fontWeightLight,
      fontWeightRegular,
      fontWeightMedium,
      fontWeightBold,
      ...variants,
    },
    other,
    {
      clone: false, // No need to clone deep
    },
  );
}
