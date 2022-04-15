import { Breakpoints, Spacing } from '@mui/system';
import { CSSProperties } from './createPalette';

export interface Mixins {
  toolbar: CSSProperties;
  // ... use interface declaration merging to add custom mixins
}

export type MixinsOptions = Partial<Mixins>;

export default function createMixins(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: MixinsOptions,
) {
  return {
    toolbar: {
      minHeight: 56,
      [`${breakpoints.up('xs')} and (orientation: landscape)`]: {
        minHeight: 48,
      },
      [breakpoints.up('sm')]: {
        minHeight: 64,
      },
    },
    ...mixins,
  };
}
