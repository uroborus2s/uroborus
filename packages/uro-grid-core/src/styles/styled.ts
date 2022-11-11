import { createStyled, shouldForwardProp } from '@mui/system';
import defaultTheme from './defaultTheme';

export const rootShouldForwardProp = (prop: PropertyKey) =>
  shouldForwardProp(prop) && prop !== 'classes';

export const slotShouldForwardProp = shouldForwardProp;

export const styled = createStyled({
  defaultTheme,
  rootShouldForwardProp,
});
