import type { ElementType } from 'react';

import type { SxProps } from '@uroborus/sense/styles';

import { GridProps } from '../components/gridProps.js';
import { UseUtilityClasses } from '../hooks/useUtilityClasses.js';
import type { DomLayoutType } from '../interface/gridOptions.js';

export interface GridRootTypeMap<P = {}, D extends ElementType = 'div'> {
  props: P & { sx?: SxProps };
  defaultComponent: D;
}

export interface GridRootProps extends Omit<GridProps, 'sx'> {
  classes?: Partial<UseUtilityClasses>;
}

export interface GridRootOwnerState
  extends Omit<GridRootProps, 'className' | 'children' | 'sx' | 'style'> {
  rtl: boolean;
  keyboardFocus: boolean;
  cursor: string;
  userSelect: string;
  domLayout: DomLayoutType;
}
