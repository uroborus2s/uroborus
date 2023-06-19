import {
  unstable_createStyleFunctionSx,
  style,
  grid,
  sizing,
  spacing,
  Interpolation,
  StyleFunctionSx,
} from '@mui/system';

import borders from './borders.js';
import { compose } from './compose.js';
import type { StyleFunction } from './compose.js';
import display from './display.js';
import flexbox from './flexbox.js';
import palette from './palette.js';
import positions from './positions.js';
import type { SxProps, Theme } from './types/index.js';

// The default system themeKey is shadows
const boxShadow = style({
  prop: 'boxShadow',
  themeKey: 'shadow',
});

// The default system themeKey is typography
export const fontFamily: StyleFunction<'fontFamily'> = style({
  prop: 'fontFamily',
  themeKey: 'fontFamily',
});

// The default system themeKey is typography
export const fontSize: StyleFunction<'fontSize'> = style({
  prop: 'fontSize',
  themeKey: 'fontSize',
});

// The default system themeKey is typography
export const fontWeight: StyleFunction<'fontWeight'> = style({
  prop: 'fontWeight',
  themeKey: 'fontWeight',
});

// The default system themeKey is typography
export const letterSpacing: StyleFunction<'letterSpacing'> = style({
  prop: 'letterSpacing',
  themeKey: 'letterSpacing',
});

export const lineHeight: StyleFunction<'lineHeight'> = style({
  prop: 'lineHeight',
  themeKey: 'lineHeight',
});

export const typographyVariant: StyleFunction<'typography'> = style({
  prop: 'typography',
  cssProperty: false,
  themeKey: 'typography',
});

const typography = compose(
  typographyVariant,
  fontFamily,
  fontSize,
  fontWeight,
  letterSpacing,
  lineHeight,
);

const styleFunctionMapping = {
  borders,
  display,
  flexbox,
  grid,
  positions,
  palette,
  boxShadow,
  sizing,
  spacing,
  typography,
};

const styleFunctionSx = unstable_createStyleFunctionSx(
  styleFunctionMapping,
) as StyleFunctionSx;

styleFunctionSx.filterProps = ['sx'];

export const sx = (styles: SxProps) => {
  return ({ theme }: { theme: Theme }) =>
    styleFunctionSx({ sx: styles, theme }) as Interpolation<{ theme: Theme }>;
};

export default styleFunctionSx;
