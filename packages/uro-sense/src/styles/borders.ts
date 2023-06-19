import { CSSProperties } from 'react';

import { style, CSSObject } from '@mui/system';

import type { StyleFunction } from './compose.js';
import { compose } from './compose.js';

function getBorder(
  value: unknown,
): number | string | CSSProperties | CSSObject {
  if (typeof value !== 'number') {
    return value as string;
  }

  return `${value}px solid`;
}

export const border: StyleFunction<'border'> = style({
  prop: 'border',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderTop: StyleFunction<'borderTop'> = style({
  prop: 'borderTop',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderRight: StyleFunction<'borderRight'> = style({
  prop: 'borderRight',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderBottom: StyleFunction<'borderBottom'> = style({
  prop: 'borderBottom',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderLeft: StyleFunction<'borderLeft'> = style({
  prop: 'borderLeft',
  themeKey: 'borders',
  transform: getBorder,
});

export const borderColor: StyleFunction<'borderColor'> = style({
  prop: 'borderColor',
  themeKey: 'palette',
});

export const borderTopColor: StyleFunction<'borderTopColor'> = style({
  prop: 'borderTopColor',
  themeKey: 'palette',
});

export const borderRightColor: StyleFunction<'borderRightColor'> = style({
  prop: 'borderRightColor',
  themeKey: 'palette',
});

export const borderBottomColor: StyleFunction<'borderBottomColor'> = style({
  prop: 'borderBottomColor',
  themeKey: 'palette',
});

export const borderLeftColor: StyleFunction<'borderLeftColor'> = style({
  prop: 'borderLeftColor',
  themeKey: 'palette',
});

const borderRadius = style({
  prop: 'borderRadius',
  themeKey: 'radius',
});

const borders = compose(
  border,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  borderColor,
  borderTopColor,
  borderRightColor,
  borderBottomColor,
  borderLeftColor,
  borderRadius,
);

export default borders;
