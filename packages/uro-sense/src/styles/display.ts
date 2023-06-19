import { style } from '@mui/system';

import type { StyleFunction } from './compose.js';
import { compose } from './compose.js';

export const displayPrint: StyleFunction<'displayPrint'> = style({
  prop: 'displayPrint',
  cssProperty: false,
  transform: (value) => ({
    '@media print': {
      display: value,
    },
  }),
});

export const displayRaw: StyleFunction<'display'> = style({
  prop: 'display',
});

export const overflow: StyleFunction<'overflow'> = style({
  prop: 'overflow',
});

export const textOverflow: StyleFunction<'textOverflow'> = style({
  prop: 'textOverflow',
});

export const visibility: StyleFunction<'visibility'> = style({
  prop: 'visibility',
});

export const whiteSpace: StyleFunction<'whiteSpace'> = style({
  prop: 'whiteSpace',
});

export default compose(
  displayPrint,
  displayRaw,
  overflow,
  textOverflow,
  visibility,
  whiteSpace,
);
