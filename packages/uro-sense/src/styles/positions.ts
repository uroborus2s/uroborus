import { style } from '@mui/system';

import type { StyleFunction } from './compose.js';
import { compose } from './compose.js';

export const position: StyleFunction<'position'> = style({
  prop: 'position',
});

export const zIndex: StyleFunction<'zIndex'> = style({
  prop: 'zIndex',
  themeKey: 'zIndex',
});

export const top: StyleFunction<'top'> = style({
  prop: 'top',
});

export const right: StyleFunction<'right'> = style({
  prop: 'right',
});

export const bottom: StyleFunction<'bottom'> = style({
  prop: 'bottom',
});

export const left: StyleFunction<'left'> = style({
  prop: 'left',
});

export default compose(position, zIndex, top, right, bottom, left);
