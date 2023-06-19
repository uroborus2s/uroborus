import type { ComponentPropsWithRef, ElementType } from 'react';

import type { SxProps } from '@mui/system';
import type { OverridableTypeMap, DistributiveOmit } from '@uroborus/core';

type SlotCommonProps = {
  component?: ElementType;
  sx?: SxProps;
};

type SlotPropsNoFun<
  TSlotComponent extends ElementType,
  TOverrides,
> = ComponentPropsWithRef<TSlotComponent> &
  TOverrides &
  SlotCommonProps &
  Record<string, unknown>;

type SlotPropsWithFun<
  TSlotComponent extends ElementType,
  TOverrides,
  TOwnerState,
> = SlotPropsNoFun<TSlotComponent, TOverrides> &
  ((ownerState: TOwnerState) => Record<string, unknown>);

export type {
  ColorSystem,
  Palette,
  ColorPaletteProp,
  DefaultColorPalette,
  PaletteRange,
  PaletteVariant,
  RequiredOmit,
  DefaultVariantProp,
  VariantPalette,
  VariantProp,
  VariantOverrides,
  Variants,
  ColorInversionConfig,
  VariantKey,
  Theme,
  ThemeScales,
  RuntimeColorSystem,
  DefaultColorScheme,
  ExtendedColorScheme,
  FontSize,
  FontFamily,
  FontWeight,
  LineHeight,
  LetterSpacing,
  TypographySystem,
  SystemProps,
  SxProps,
} from './types/index.js';

export interface StyledComponentProps {
  /**
   * 允许定义系统覆盖以及附加 CSS 样式的系统属性.
   */
  sx?: SxProps;
}

export type BaseProps<M extends OverridableTypeMap> = StyledComponentProps &
  M['props'];

export type OverrideProps<
  M extends OverridableTypeMap,
  C extends ElementType,
> = BaseProps<M> &
  DistributiveOmit<ComponentPropsWithRef<C>, keyof BaseProps<M>>;

export type SlotProps<
  TSlotComponent extends ElementType,
  TOverrides,
  TOwnerState,
> =
  | SlotPropsNoFun<TSlotComponent, TOverrides>
  | SlotPropsWithFun<TSlotComponent, TOverrides, TOwnerState>;

/**
 * 使用 T 确保 K 包含 T 的所有的键
 *
 * @example CreateSlotsAndSlotProps<'root' | 'decorator', { root: ..., decorator: ... }>
 */
export type CreateSlotsAndSlotProps<
  T extends string,
  K extends Record<T, any>,
> = {
  slots?: {
    [P in keyof K]?: ElementType;
  };
  slotProps?: {
    [P in keyof K]?: K[P];
  };
};

export type { WithCommonProps } from './useSlot.js';

export { default as useThemeProps } from './useThemeProps.js';

export { default as useSlot } from './useSlot.js';

export { default } from './styled.js';

export { generateUtilityClass, generateUtilityClasses } from './className.js';
