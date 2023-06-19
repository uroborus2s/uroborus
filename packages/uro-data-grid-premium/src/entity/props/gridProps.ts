import { ElementType, Ref } from 'react';
import { OverrideProps } from '@/types';
import { SxProps } from '@mui/system';
import { GridClasses, Theme } from '@/styles';
import { NumberSequence } from '@uroborus/core';
import { GridApi, GridColumnApi } from '@/entity/types/gridApi';
import { GridOptions } from './gridOptions';

export interface GridTypeMap<
  Option extends GridOptions = {},
  P = {},
  D extends ElementType = 'div',
> {
  props: P & {
    gridOptions?: Option;
    gridApiRef?: Ref<GridApi>;
    columnApiRef?: Ref<GridColumnApi>;
  } & Option & { sx?: SxProps<Theme>; classes?: Partial<GridClasses> };
  defaultComponent: D;
}

export type GridProps<
  Option extends GridOptions = GridOptions,
  P = {},
  D extends ElementType = GridTypeMap['defaultComponent'],
> = OverrideProps<GridTypeMap<Option, P, D>, D>;

export const gridInstanceSequence = new NumberSequence();
