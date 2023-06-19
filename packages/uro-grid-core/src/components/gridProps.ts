import type { ElementType } from 'react';

import type { DistributiveOmit } from '@uroborus/core';
import type {
  CreateSlotsAndSlotProps,
  OverrideProps,
  SlotProps,
} from '@uroborus/sense/styles';

import type { GridOptions } from '../interface/gridOptions.js';
import type { GridValidRowModel } from '../porps/gridRowProps.js';

export type GridInternalProps = DistributiveOmit<GridProps, keyof GridOptions>;

export interface DataGridOwnerState {
  rtl: boolean;
  userSelect: boolean;
  cursor: boolean;
  keyboardFocusClass: boolean;
  layoutClass: string;
}

export type DataGridSlots = 'root';

/*
{
slots:{
  root:Div
},
slotProps:{
  root: Pros<'div'>&OwnerState
},
}
 */
export type DataGridSlotsAndSlotProps = CreateSlotsAndSlotProps<
  DataGridSlots,
  {
    root: SlotProps<'div', {}, DataGridOwnerState>;
  }
>;

export interface DataGridTypeMap<
  R extends GridValidRowModel = any,
  P = {},
  D extends ElementType = 'div',
> {
  props: P &
    GridOptions<R> &
    DataGridSlotsAndSlotProps & {
      gridOptions?: GridOptions<R>;
    };
  defaultComponent: D;
}

export type GridProps<
  R extends GridValidRowModel = any,
  D extends ElementType = DataGridTypeMap['defaultComponent'],
  P = { component?: ElementType },
> = OverrideProps<DataGridTypeMap<R, P, D>, D>;
