import type { ElementType } from 'react';

import type { SlotComponentProps } from '@mui/base/utils';
import type { SxProps } from '@mui/system';
import type { OverridableStringUnion } from '@uroborus/core';

import type {
  ColorPaletteProp,
  OverrideProps,
  RequiredOmit,
  VariantProp,
  CreateSlotsAndSlotProps,
  SlotProps,
} from '../styles/index.js';

export type CircularProgressSlot = 'root' | 'svg' | 'track' | 'progress';

export interface CircularProgressPropsColorOverrides {}
export interface CircularProgressPropsSizeOverrides {}
export interface CircularProgressPropsVariantOverrides {}

export type CircularProgressSlotsAndSlotProps = CreateSlotsAndSlotProps<
  CircularProgressSlot,
  {
    root: SlotProps<'span', {}, CircularProgressOwnerState>;
    svg: SlotProps<'svg', {}, CircularProgressOwnerState>;
    track: SlotProps<'circle', {}, CircularProgressOwnerState>;
    progress: SlotProps<'circle', {}, CircularProgressOwnerState>;
  }
>;

interface ComponentsProps {
  root?: SlotComponentProps<
    'span',
    { sx?: SxProps },
    CircularProgressOwnerState
  >;
  svg?: SlotComponentProps<'svg', { sx?: SxProps }, CircularProgressOwnerState>;
  track?: SlotComponentProps<
    'circle',
    { sx?: SxProps },
    CircularProgressOwnerState
  >;
  progress?: SlotComponentProps<
    'circle',
    { sx?: SxProps },
    CircularProgressOwnerState
  >;
}

export interface CircularProgressTypeMap<
  P = {},
  D extends ElementType = 'span',
> {
  props: P &
    CircularProgressSlotsAndSlotProps & {
      /**
       * 组件的颜色。它支持对该组件有意义的主题颜色。
       * @default 'primary'
       */
      color?: OverridableStringUnion<
        ColorPaletteProp,
        CircularProgressPropsColorOverrides
      >;
      /**
       * 用于CircularProgress内每个窗口的道具。
       * @default {}
       */
      componentsProps?: ComponentsProps;
      /**
       * 用于选择变量的布尔值。
       * 如果没有进度值，则使用INDICATE。
       * @default false
       */
      determinate?: true | false;
      /**
       * 组件的大小。
       * It accepts theme values between 'sm' and 'lg'.
       * @default 'md'
       */
      size?: OverridableStringUnion<
        'sm' | 'md' | 'lg',
        CircularProgressPropsSizeOverrides
      >;
      /**
       * 允许定义系统覆盖以及附加 CSS 样式的系统属性.
       */
      sx?: SxProps;
      /**
       * 圆的厚度。
       */
      thickness?: number;
      /**
       * 确定变量的进度指示器的值。
       * 介于0和100之间的值。
       *
       * 对于不确定的，@Default 25
       */
      value?: number;
      /**
       * 要使用的变量。
       * @default 'soft'
       */
      variant?: OverridableStringUnion<
        VariantProp,
        CircularProgressPropsVariantOverrides
      >;
    };
  defaultComponent: D;
}

export type CircularProgressProps<
  D extends ElementType = CircularProgressTypeMap['defaultComponent'],
  P = { component?: ElementType },
> = OverrideProps<CircularProgressTypeMap<P, D>, D>;

export interface CircularProgressOwnerState
  extends RequiredOmit<
    CircularProgressProps,
    'color' | 'variant' | 'value' | 'thickness' | 'determinate'
  > {
  circSize: number;
}
