import {
  ComponentPropsWithRef,
  CSSProperties,
  ElementType,
  FC,
  NamedExoticComponent,
} from 'react';
import { DistributiveOmit } from '../../uro-sense';

export type OverrideProps<
  M extends OverridableTypeMap,
  C extends ElementType,
> = BaseProps<M> &
  DistributiveOmit<ComponentPropsWithRef<C>, keyof BaseProps<M>>;

export type BaseProps<M extends OverridableTypeMap> = M['props'] & CommonProps;

export interface CommonProps extends StyledComponentProps {
  className?: string;
  style?: CSSProperties;
}

export interface OverridableTypeMap {
  props: {};
  defaultComponent: ElementType;
}

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

export type ReactComponent = FC<any> | NamedExoticComponent<any>;
