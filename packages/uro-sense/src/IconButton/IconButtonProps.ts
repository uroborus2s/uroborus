import type { ElementType, HTMLAttributes, Ref } from 'react';

import type { SxProps } from '@mui/system';
import type { OverridableStringUnion } from '@uroborus/core';

import type {
  OverrideProps,
  ColorPaletteProp,
  VariantProp,
} from '../styles/index.js';

export interface IconButtonPropsVariantOverrides {}

export interface IconButtonPropsColorOverrides {}

export interface IconButtonPropsSizeOverrides {}

export interface IconButtonTypeMap<P = {}, D extends ElementType = 'button'> {
  props: P & {
    /**
     * 命令性操作的引用。 It currently only supports `focusVisible()` action.
     */
    action?: Ref<{
      focusVisible(): void;
    }>;
    /**
     * 组件的颜色。它支持对此组件有意义的主题颜色。
     * @default 'primary'
     */
    color?: OverridableStringUnion<
      ColorPaletteProp,
      IconButtonPropsColorOverrides
    >;
    /**
     * 如果为“true”，则禁用该组件。
     * @default false
     */
    disabled?: boolean;
    /**
     * 此道具可以帮助识别哪个元素具有键盘焦点。
     * 当元素通过键盘交互获得焦点时，将应用类名。
     * A [polyfill can be used](https://github.com/WICG/focus-visible) to apply a `focus-visible` class to other components
     * if needed.
     */
    focusVisibleClassName?: string;
    /**
     * 组件的大小。
     * @default 'md'
     */
    size?: OverridableStringUnion<
      'sm' | 'md' | 'lg',
      IconButtonPropsSizeOverrides
    >;
    /**
     * The system prop that allows defining system overrides as well as additional CSS styles.
     */
    sx?: SxProps;
    /**
     * @default 0
     */
    tabIndex?: NonNullable<HTMLAttributes<any>['tabIndex']>;
    /**
     * 要使用的变量。
     * @default 'soft'
     */
    variant?: OverridableStringUnion<
      VariantProp,
      IconButtonPropsVariantOverrides
    >;
  };
  defaultComponent: D;
}

export type IconButtonProps<
  D extends ElementType = IconButtonTypeMap['defaultComponent'],
  P = { component?: ElementType },
> = OverrideProps<IconButtonTypeMap<P, D>, D>;
