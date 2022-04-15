import { ComponentPropsWithRef, CSSProperties, ElementType } from 'react';
import { SxProps } from '@mui/system';
import { Theme } from './components';

export type ClassNameMap<ClassKey extends string = string> = Record<
  ClassKey,
  string
>;

export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>;
}

export interface CommonProps extends StyledComponentProps<never> {
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

export interface OverridableTypeMap {
  props: Record<string, unknown>;
  defaultComponent: ElementType;
}

export type BaseProps<M extends OverridableTypeMap> = M['props'] &
  CommonProps & { component?: M['defaultComponent'] };

//组件的参数
export type ComponentProps<
  M extends OverridableTypeMap,
  C extends ElementType = M['defaultComponent'],
> = BaseProps<M> & Omit<ComponentPropsWithRef<C>, keyof BaseProps<M>>;
