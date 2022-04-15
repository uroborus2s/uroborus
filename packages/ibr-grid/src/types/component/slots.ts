import { JSXElementConstructor } from 'react';

export interface GridIconSlotsComponent {
  BooleanCellTrueIcon: JSXElementConstructor<any>;
}

export interface GridSlotsComponent extends GridIconSlotsComponent {
  BaseCheckbox: JSXElementConstructor<any>;
}
