import { style } from '@mui/system';

import type { StyleFunction } from './compose.js';
import { compose } from './compose.js';

function transform(value: unknown, userValue: unknown) {
  if (userValue === 'grey') {
    return userValue as string;
  }
  return value as string;
}

export const color: StyleFunction<'color'> = style({
  prop: 'color',
  themeKey: 'palette',
  transform,
});

export const bgcolor: StyleFunction<'bgcolor'> = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform,
});

export const backgroundColor: StyleFunction<'backgroundColor'> = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform,
});

const palette = compose(color, bgcolor, backgroundColor);

export default palette;
