import * as CSS from 'csstype';
import { Breakpoints, Spacing } from '@mui/system';

export type NormalCssProperties = CSS.Properties<number | string>;
export type Fontface = CSS.AtRule.FontFace & {
  fallbacks?: CSS.AtRule.FontFace[];
};

export interface BaseCSSProperties extends NormalCssProperties {
  '@font-face'?: Fontface | Fontface[];
}

export interface CSSProperties extends BaseCSSProperties {
  // 允许伪选择器和媒体查询
  [k: string]: unknown | CSSProperties;
}

export interface Mixins {
  toolbar: CSSProperties;
  // ... use interface declaration merging to add custom mixins
}

export type MixinsOptions = Partial<Mixins>;

export default function createMixins(
  breakpoints: Breakpoints,
  spacing: Spacing,
  mixins: MixinsOptions,
): Mixins {
  return {
    ...{
      toolbar: {
        minHeight: 56,
        [breakpoints.up('xs')]: {
          '@media (orientation: landscape)': {
            minHeight: 48,
          },
        },
        [breakpoints.up('sm')]: {
          minHeight: 64,
        },
      },
    },
    ...mixins,
  };
}
