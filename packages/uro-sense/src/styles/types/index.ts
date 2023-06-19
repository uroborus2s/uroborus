export type RequiredOmit<T, K extends keyof never> = Omit<T, K> &
  Required<Pick<T, Extract<keyof T, K>>>;

export type {
  ColorSystem,
  Palette,
  ColorPaletteProp,
  DefaultColorPalette,
  PaletteRange,
  PaletteVariant,
} from './colorSystem.js';
export { createColorSchemes, createPalette } from './colorSystem.js';

export type {
  DefaultVariantProp,
  VariantPalette,
  VariantProp,
  VariantOverrides,
  Variants,
  ColorInversionConfig,
  VariantKey,
} from './variants.js';
export { createVariants } from './variants.js';

export type {
  Theme,
  ThemeScales,
  RuntimeColorSystem,
  SystemProps,
  SxProps,
} from './theme.js';

export type { DefaultColorScheme, ExtendedColorScheme } from './colorScheme.js';

export type { Focus } from './focus.js';

export { createFocus } from './focus.js';

export {
  createTypography,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
} from './typography.js';
export type {
  FontSize,
  FontFamily,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TypographySystem,
} from './typography.js';

export { radius } from './radius.js';
export { createShadow } from './shadow.js';
