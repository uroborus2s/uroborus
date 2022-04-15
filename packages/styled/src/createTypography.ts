import { deepmerge } from '@mui/utils';
import { CSSProperties, NormalCssProperties } from './createPalette';
import { Palette } from './palette';

function round(value: number) {
  return Math.round(value * 1e5) / 1e5;
}

const caseAllCaps: NormalCssProperties = {
  textTransform: 'uppercase',
};
const defaultFontFamily = '"Roboto", "Helvetica", "Arial", sans-serif';

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
  fontFamily: CSSProperties['fontFamily'];
  fontSize: number;
  fontWeightLight: CSSProperties['fontWeight'];
  fontWeightRegular: CSSProperties['fontWeight'];
  fontWeightMedium: CSSProperties['fontWeight'];
  fontWeightBold: CSSProperties['fontWeight'];
  htmlFontSize: number;
}>;

export interface FontStyleOptions extends Partial<FontStyle> {
  allVariants?: CSSProperties;
}

export interface TypographyUtils {
  pxToRem: (px: number) => string;
}

export type TypographyOptions = Partial<
  Record<Variant, TypographyStyleOptions> & FontStyleOptions & TypographyUtils
>;
export type TypographyStyle = CSSProperties;
export type TypographyStyleOptions = TypographyStyle;

export type Typography = Record<Variant, TypographyStyle> &
  FontStyle &
  TypographyUtils;

export default function createTypography(
  palette: Palette,
  typography: TypographyOptions | ((palette: Palette) => TypographyOptions),
): Typography {
  const {
    fontFamily = defaultFontFamily,
    // The default font size of the Material Specification.
    fontSize = 14, // px
    fontWeightLight = 300,
    fontWeightRegular = 400,
    fontWeightMedium = 500,
    fontWeightBold = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize = 16,
    // Apply the CSS properties to all the variants.
    allVariants,
    pxToRem: pxToRem2,
    ...other
  } = typeof typography === 'function' ? typography(palette) : typography;

  const coef = fontSize / 14;
  const pxToRem = pxToRem2 || ((size) => `${(size / htmlFontSize) * coef}rem`);
  const buildVariant = (
    fontWeight: CSSProperties['fontWeight'],
    size: number,
    lineHeight: CSSProperties['lineHeight'],
    letterSpacing: number,
    casing?: NormalCssProperties,
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
