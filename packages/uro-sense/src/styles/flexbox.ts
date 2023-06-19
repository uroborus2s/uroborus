import { style } from '@mui/system';

import type { StyleFunction } from './compose.js';
import { compose } from './compose.js';

export const flexBasis: StyleFunction<'flexBasis'> = style({
  prop: 'flexBasis',
});

export const flexDirection: StyleFunction<'flexDirection'> = style({
  prop: 'flexDirection',
});

export const flexWrap: StyleFunction<'flexWrap'> = style({
  prop: 'flexWrap',
});

export const justifyContent: StyleFunction<'justifyContent'> = style({
  prop: 'justifyContent',
});

export const alignItems: StyleFunction<'alignItems'> = style({
  prop: 'alignItems',
});

export const alignContent: StyleFunction<'alignContent'> = style({
  prop: 'alignContent',
});

export const order: StyleFunction<'order'> = style({
  prop: 'order',
});

export const flex: StyleFunction<'flex'> = style({
  prop: 'flex',
});

export const flexGrow: StyleFunction<'flexGrow'> = style({
  prop: 'flexGrow',
});

export const flexShrink: StyleFunction<'flexShrink'> = style({
  prop: 'flexShrink',
});

export const alignSelf: StyleFunction<'alignSelf'> = style({
  prop: 'alignSelf',
});

export const justifyItems: StyleFunction<'justifyItems'> = style({
  prop: 'justifyItems',
});

export const justifySelf: StyleFunction<'justifySelf'> = style({
  prop: 'justifySelf',
});

const flexbox = compose(
  flexBasis,
  flexDirection,
  flexWrap,
  justifyContent,
  alignItems,
  alignContent,
  order,
  flex,
  flexGrow,
  flexShrink,
  alignSelf,
  justifyItems,
  justifySelf,
);

export default flexbox;
