import type {
  Breakpoints,
  Spacing,
  SystemProps as SystemSystemProps,
  SxProps as SystemSxProps,
} from '@mui/system';

import type { DefaultColorScheme } from './colorScheme.js';
import type { ColorSystem } from './colorSystem.js';
import type { Focus } from './focus.js';
import type { Radius } from './radius.js';
import type { Shadow } from './shadow.js';
import type {
  FontFamily,
  FontSize,
  FontWeight,
  LetterSpacing,
  LineHeight,
  TypographySystem,
} from './typography.js';
import type { Variants } from './variants.js';

type Split<T, K extends keyof T = keyof T> = K extends string | number
  ? { [k in K]: Exclude<T[K], undefined> }
  : never;

type ConcatDeep<T> = T extends Record<string | number, infer V>
  ? keyof T extends string | number
    ? V extends string | number
      ? keyof T
      : keyof V extends string | number
      ? `${keyof T}-${ConcatDeep<Split<V>>}`
      : never
    : never
  : never;

export interface RuntimeColorSystem extends Omit<ColorSystem, 'palette'> {
  palette: ColorSystem['palette'] & {
    colorScheme: DefaultColorScheme;
  };
}

export interface ThemeScales {
  radius: Radius;
  shadow: Shadow;
  focus: { thickness: string };
  fontFamily: FontFamily;
  fontSize: FontSize;
  fontWeight: FontWeight;
  lineHeight: LineHeight;
  letterSpacing: LetterSpacing;
}

export interface Theme extends ThemeScales, RuntimeColorSystem {
  colorSchemes: Record<DefaultColorScheme, ColorSystem>;
  focus: Focus;
  typography: TypographySystem;
  variants: Variants;
  spacing: Spacing;
  breakpoints: Breakpoints;
  getColorSchemeSelector: (colorScheme: DefaultColorScheme) => string;
}

export type SystemProps = SystemSystemProps<Theme>;

export type SxProps = SystemSxProps<Theme>;
