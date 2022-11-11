import { SlotComponentProps } from '@mui/base/utils';
import { OverridableStringUnion, OverrideProps } from '@mui/types';
import * as React from 'react';
import { ColorPaletteProp, SxProps, VariantProp } from '../styles/types';

export type CircularProgressSlot = 'root' | 'svg' | 'track' | 'progress';

export interface CircularProgressPropsColorOverrides {}
export interface CircularProgressPropsSizeOverrides {}
export interface CircularProgressPropsVariantOverrides {}

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
  D extends React.ElementType = 'span',
> {
  props: P & {
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
     * 如果没有进度值，则使用INDIFINATE。
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
     * The system prop that allows defining system overrides as well as additional CSS styles.
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
    gap?: number | string;
  };
  defaultComponent: D;
}

export type CircularProgressProps<
  D extends React.ElementType = CircularProgressTypeMap['defaultComponent'],
  P = { component?: React.ElementType },
> = OverrideProps<CircularProgressTypeMap<P, D>, D>;

export interface CircularProgressOwnerState extends CircularProgressProps {
  /**
   * @internal 实例上的显式大小: <CircularProgress size="..." />
   */
  instanceSize: CircularProgressProps['size'];
  circSize: number;
}
